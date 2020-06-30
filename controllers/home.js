
module.exports = {

    get: {
        home : (req,res,next) => {
            res.render('home.hbs', {...req.user|| '', title : "Home Page"});
        }
    },
    post:{}
}