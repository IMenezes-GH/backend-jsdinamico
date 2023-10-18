import jwt from "jsonwebtoken";

const JWTVerify = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader) return res.status(401).json('Acesso não autorizado.');

    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Acesso não autorizado.'});
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Acesso não autorizado' })
            req.username = decoded.username
            next()
        })
}

export default JWTVerify;