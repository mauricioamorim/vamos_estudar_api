const mongoose      = require("mongoose");

mongoose.connect("mongodb://localhost/vamos_estudar", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise    = global.Promise;

module.exports      = mongoose;