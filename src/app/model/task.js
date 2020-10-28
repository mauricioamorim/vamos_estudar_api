const mongoose = require("../../modules/mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assingedTo:{
        type: mongoose.Schema.type.ObjectId,
        ref: "User",
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})