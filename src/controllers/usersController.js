import { cError } from "../config/chalkConfig.js";
import { User } from "../models/UserSchema.js";


// GET /user
/**
 * Controla a resposta do endpoint /user
 * @param {Request} req GET REQUEST FOR /user
 * @param {Response} res GET RESPONSE FOR /user
 */
export const getUsers = async (req, res) => {

    const query = req.query;

    try {
        if (query.username) {
            const users = await User.find({username: query.username});
            res.json(users);
        }
        else {
            const users = await User.find();
            res.json(users);
        }
    }
    catch (err){
        cError(err);
        res.json({message: err.message})
    }
}