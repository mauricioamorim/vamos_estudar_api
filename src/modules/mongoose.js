const mongoose          = require("mongoose");
const mongooseConfig    = require("../config/mongoose.json");

mongoose.connect("mongodb://localhost/vamos_estudar", mongooseConfig);

mongoose.Promise    = global.Promise;

module.exports      = mongoose;