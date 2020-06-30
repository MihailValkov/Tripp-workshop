module.exports= {
    get : {
        error(req,res,next){
            const title = "Error Page"
            res.render('../views/error/404.hbs',{...req.user|| '',title})
        }
    }
}