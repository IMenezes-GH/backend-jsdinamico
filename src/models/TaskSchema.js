import { Schema, model } from "mongoose";

export const TaskSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String
    },
    type: {
        type: Schema.Types.String,
        default: 'normal',
        required: true,
    },
    creationDate: {
        type: Schema.Types.Date,
        required: true
    },
    completed: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    due_date: {
        type: Schema.Types.Date,
    },
    to_do: {
        type: [{
            objective: {
                type: Schema.Types.String,
            },
            checked: {
                type: Schema.Types.Boolean,
                default: false
            }
        }]
    }
})

const Task = model('Task', TaskSchema);
export {Task};