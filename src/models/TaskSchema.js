import { Schema } from "mongoose";

export const TaskSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    type: {
        type: String,
        default: 'normal',
        required: true,
    },
    due_date: {
        type: Date,
    },
    To_do: [{objective:String, checked: Boolean}]
})