require('dotenv').config()
global.__basedir = __dirname;
const db = require('./config/dataBase');
const env = process.env.NODE_ENV;
const config = require("./config/config")[env];
const app = require('express')();
const path = require('path')


db().then(()=> {
    require('./config/express')(app);
    require('./config/routes')(app);
    app.use(function(err,req,res,next){
        {
            if(err.name==="CastError") {
                res.render(path.resolve('./views/error/404.hbs'),req.user|| '')
            }
            if (err.status === 500) {
                res.render(path.resolve('./views/error/500.hbs'),req.user|| '')
            }
            
        }
    })
    
    app.listen(config.port,console.log(`*** Server is listening on port:${config.port} ***`));
})