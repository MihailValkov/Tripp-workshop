const mongoose = require("mongoose");
const env = process.env.NODE_ENV;
const config = require("./config")[env];

module.exports = () => {
 return mongoose.connect(config.dataBase,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
      if (err) {
        console.log("!!!--- > Data base is not connect < --- !!!");
        return;
      }
      console.log("*** Data base is connected ***");
    }
  );
};
