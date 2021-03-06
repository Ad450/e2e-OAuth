import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: false,
    },
    isChecked: {
        type: Boolean,
        reqiured: true
    },
    hash: {
        type: String,
        required: true,
    }
})

export const Todo = mongoose.model("Todo", todoSchema);


