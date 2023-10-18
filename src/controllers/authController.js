import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cError } from '../config/chalkConfig.js';
import { User } from '../models/UserSchema.js';

const login = async(req, res) => {

    const {username, password} = req.body;
    console.log(username, password);
    if (!username || !password) return res.json({message: 'Usuário e senha são campos obrigatórios'});

    try {

        const user = await User.findOne({username}).lean().exec();
        if (!user) return res.status(404).json({message: 'usuário não encontrado'});

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) return res.status(401).json({message: 'Senha incorreta'});

        const accessToken = jwt.sign({"username": username}, process.env.ACCESS_TOKEN, {expiresIn: '10m'});
        const refreshToken = jwt.sign({"username": username}, process.env.REFRESH_TOKEN, {expiresIn: '7d'});

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.json({message: 'Login is successful!'});

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }

}

export {login}