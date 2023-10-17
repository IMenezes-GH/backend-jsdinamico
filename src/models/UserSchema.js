import { Schema, model } from "mongoose";
import { TaskSchema } from "./TaskSchema.js";

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },

    tasks: [TaskSchema]
})

const User = model('User', UserSchema);

export {User}