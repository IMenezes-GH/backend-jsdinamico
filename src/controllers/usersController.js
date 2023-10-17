import chalk from "chalk";
import { cError, cInfo, cLog, cSuccess } from "../config/chalkConfig.js";
import { User } from "../models/UserSchema.js";
import bcrypt from 'bcrypt';


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
            const users = await User.find({username: query.username}).select('-password').lean();
            
            if (users.length) return res.json(users);
            else return res.status(400).json({message: `Usuário '${query.username}' não foi encontrado.`});
           
        }
        else {
            const users = await User.find().select('-password').lean();
    
            if (users.length) return res.json(users);
            else return res.status(400).json({message: 'Nenhum usuário encontrado.'});
        }
    }
    catch (err){
        cError(err);
        res.status(500).json({message: err.message})
    }
}

export const createUser = async (req,res) => {

    const {name, username, password} = req.body;

    if (!name || !username || !password) return res.json({message: `Os campos nome, sobrenome e senha são obrigatórios.`});
    try {

        const duplicateUsername = await User.findOne({username}).select('-password').lean().exec();
        if (duplicateUsername) {
            cError(`Não foi possível cadastrar o usuário ${username}. Razão: Este nome de usuário já existe`)
            return res.status(409).json({message: 'Nome de usuário precisa ser único.'})
        };

        const hashPwd = await bcrypt.hash(password, 15);
        const newUser = {name, username, password: hashPwd, creationDate: new Date()};
        
        await User.create(newUser);

        if (newUser) {
            cLog(`Novo usuário: ${chalk.blueBright(newUser.username)} cadastrado em ${chalk.blueBright(newUser.creationDate.toLocaleDateString())} às: ${chalk.blueBright(newUser.creationDate.toLocaleTimeString())}`);
            return res.status(201).json({message: 'Novo usuário cadastrado com sucesso!'})}
        else res.status(400).json({message: "Não foi possível cadastrar esse usuário."});


    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }
}