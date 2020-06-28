require('dotenv').config()
global.__basedir = __dirname;
const db = require('./config/dataBase');
const env = process.env.NODE_ENV;
const config = require("./config/config")[env];
const app = require('express')();


db().then(()=> {
    require('./config/express')(app);
    require('./config/routes')(app);
    app.use(function(err,req,res,next){
        {
            console.log(err);
            
        }
    })
    
    app.listen(config.port,console.log(`*** Server is listening on port:${config.port} ***`));
})