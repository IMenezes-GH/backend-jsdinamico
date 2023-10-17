import { cError } from "../config/chalkConfig.js";
import { User } from "../models/UserSchema.js";

export const getTasks = async (req, res) => {

    const {username} = req.params;
    const {taskID} = req.body;


    try {
        const user = await User.findOne({username}).select('-password').lean();
        if (taskID) {
            console.log(user.tasks);
        }
        res.json(user.tasks);

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }

}