import { connect } from "mongoose";
import { cSuccess, cError } from "./chalkConfig.js";

const mongoConnect = async () => {

    try {
        await connect(process.env.DATABASE_URI);
        cSuccess('Conectado ao banco de dados com sucesso!');

    } catch (err) {
        cError('Não foi possível conectar ao banco de dados.', err.stack);
    }

}

export default mongoConnect;