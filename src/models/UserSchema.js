import { Schema, model } from "mongoose";
import { TaskSchema } from "./TaskSchema.js";

const UserSchema = Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    creationDate: {
        type: Schema.Types.Date,
        required: true
    }
})

const User = model('User', UserSchema);

export {User}