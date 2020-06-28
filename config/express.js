const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports= (app)=> {

    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser())
    app.use(express.static(path.resolve(__basedir, 'public')));
    app.set('views',path.resolve(__basedir,'views'));
    app.engine('.hbs',handlebars({extname : 'hbs'}));
}
