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


// POST /user
/**
 * Controla a resposta do endpoint /user
 * @param {Request} req POST REQUEST FOR /user
 * @param {Response} res POST RESPONSE FOR /user
 */
export const createUser = async (req,res) => {

    const {name, username, password} = req.body;

    if (!name || !username || !password) return res.json({message: `Os campos nome, sobrenome e senha são obrigatórios.`});
    try {

        // Verifique se há duplicidade primeiro
        const duplicateUsername = await User.findOne({username}).select('-password').lean().exec();
        if (duplicateUsername) {
            cError(`Não foi possível cadastrar o usuário ${username}. Razão: Este nome de usuário já existe`);
            return res.status(409).json({message: 'Nome de usuário precisa ser único.'});
        };

        const hashPwd = await bcrypt.hash(password, 15);
        const newUser = {name, username, password: hashPwd, creationDate: new Date()};
        
        await User.create(newUser);

        if (newUser) {
            cLog(`Novo usuário: ${chalk.blueBright(newUser.username)} cadastrado em ${chalk.blueBright(newUser.creationDate.toLocaleDateString())} às: ${chalk.blueBright(newUser.creationDate.toLocaleTimeString())}`);
            return res.status(201).json({message: 'Novo usuário cadastrado com sucesso!'});
        }
        else res.status(400).json({message: "Não foi possível cadastrar esse usuário."});


    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }
};


// PATCH /user
/**
 * Controla a resposta do endpoint /user
 * @param {Request} req PATCH REQUEST FOR /user
 * @param {Response} res PATCH RESPONSE FOR /user
 */
export const updateUser = async (req, res) => {

    const {id, name, username, password} = req.body;

    try {
        if (!id || !username) {
            cError(`Não foi possível atualizar o usuário ${username}. Razão: Dados não preenchidos.`);
            return res.status(400).json({message: 'Não foi possível atualizar esse usuário'});
        }
        
        const user = await User.findById(id).exec();
        const foundDuplicateUser = await User.findOne({username}).lean().exec();

        if (foundDuplicateUser && foundDuplicateUser._id.toString() !== id) {
            cError(`Não foi possível atualizar o nome de usuário para ${username}. Razão: Este nome de usuário já existe`);
            return res.status(409).json({message: 'Nome de usuário precisa ser único.'});
        }

        user.username = username;
        if (name) user.name = name;

        if (password) {
            const hashPwd = await bcrypt.hash(password, 15);
            user.password = password;
        }

        const userUpdated = await user.save();
        if (userUpdated) {
            cSuccess(`Usuário ${user.username} atualizado com sucesso!`);
            return res.status(200).json({message: 'Usuário atualizado com sucesso!'})
        }
        else {
            cError(`Não foi possível atualizar o usuário ${user.username}.`);
            return res.status(400).json({message: `Não foi possível atualizar o usuário: ${user.username}.`});
        }

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }

}

// DELETE /user
/**
 * Controla a resposta do endpoint /user
 * @param {Request} req DELETE REQUEST FOR /user
 * @param {Response} res DELETE RESPONSE FOR /user
 */
export const deleteUser = async (req, res) => {

    const {id} = req.body;

    try {

        const user = await User.findById(id).exec();
        if (!user) return res.json({message: 'Esse usuário não pode ser deletado. Usuário não existe.'});
        
        const deletedUser = await user.deleteOne();

        cInfo(`usuário ${deletedUser.username} foi deletado.`);
        return res.json({message: `usuário ${deletedUser.username} foi deletado.`});

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }

}