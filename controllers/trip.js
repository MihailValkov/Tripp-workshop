const tripModel = require("../models/trip");
const userModel = require("../models/user");
module.exports = {
  get: {
    sharedtrips(req, res, next) {
      tripModel
        .find()
        .lean()
        .populate('buddies')
        .then((trips) => {
          res.render("../views/trip/shared-trips.hbs", {
            ...req.user|| '',
            trips :trips=trips.map(x=> {
              const seat= x.seats- x.buddies.length=== 1;
              const seats = x.seats- x.buddies.length>1 ? x.seats- x.buddies.length : false;
              const AvailableSeats =x.seats- x.buddies.length;
              return Object.assign(x,{seat,seats,AvailableSeats})
            }),
            title :"Trips Page",
          });
        });
    },
    offertrip(req, res, next) {
      res.render("../views/trip/offer-trip.hbs", {
        ...req.user|| '',title :"Create Trip Page"
      });
    },
    details (req,res,next){
        const {id}= req.params;
        tripModel.findById(id).populate('buddies').lean().then((trip)=> {
            const isCreator =trip.creator=== req.user.email;
            const isAvailableSeats=trip.seats - trip.buddies.length;
            const isJoined = !!trip.buddies.find(x=> x.email === req.user.email)
            res.render('../views/trip/details.hbs',{
               ...req.user|| '',
               username:req.user.email.split("@")[0].replace('-'," ").replace('_'," "),
                ...trip,
                buddies : trip.buddies.map((x,i)=> x = `${i+1}.${x.email}`),
                isCreator,
                isAvailableSeats,
                isJoined ,
                title :"Details Page" 
            });
        }).catch(next)
    },
    closetrip(req,res,next){
        const id = req.params._id
        tripModel.findByIdAndDelete({_id:id})
        .then((deleted)=>{
            res.redirect('../../shared-trips'); 

        }).catch(next)
    },
    jointrip(req,res,next){
        const tripId = req.params._id;
        Promise.all([
            tripModel.findByIdAndUpdate({_id:tripId},{$addToSet : {buddies : req.user.id}},{useFindAndModify : false}),
            userModel.findByIdAndUpdate({_id:req.user.id},{$addToSet : {tripsHistory : tripId}},{useFindAndModify : false})
        ]).then(([updatedTrip,updatedUser])=>{
            res.redirect(`../${tripId}`);
        }).catch(next)
    },
    edittrip(req,res,next){
      tripModel.findById(req.params._id).lean().then((trip)=> {
        res.render('../views/trip/edit-trip.hbs',{
          ...req.user|| '',
          ...trip,
          title :"Edit Trip Page"
        })
      }).catch(next)

    }
  },
  post: {
    offertrip(req, res, next) {
      const { startPoint,endPoint,date,time,carImage,carModel,seats,price,description,smoking,drinking,eating,climatic } = req.body;
      tripModel
        .create({startPoint,endPoint,date,time,carImage,carModel,seats,price,description,smoking,drinking,eating,climatic,creator:req.user.email})
        .then((x) => {res.redirect("/trip/shared-trips");})
        .catch((error) => {
          if (error.name === "ValidationError") {
            const message = error.message.includes("Path")
              ? "Please fullfil all fields"
              : error.message.split(": ")[error.message.split(": ").length - 1];
            res.render("../views/trip/offer-trip.hbs", { ...req.body ,message });
            return;
          }
          next(error);
        });
    },
    edittrip(req,res,next){
      const {_id}= req.params;
      const {startPoint,endPoint,date,time,carImage,carModel,seats,price,description,smoking,drinking,eating,climatic}= req.body;
      tripModel.findByIdAndUpdate(_id,{startPoint,endPoint,date,time,carImage,carModel,seats,price,description,smoking,drinking,eating,climatic})
      .then((e)=>res.redirect(`../${_id}`))
      .catch(next)
    }
  },
};
