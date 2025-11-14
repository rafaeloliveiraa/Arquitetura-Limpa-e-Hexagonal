import { Express } from 'express'
import LoginUsuario from '../core/usuario/LoginUsuario';

export default class LoginUsuarioController {

    constructor(
        private servidor: Express,
        private casoDeUso: LoginUsuario
    ) {
        this.servidor.post('/login', async (req, res) => {
            try {
            const resposta = await this.casoDeUso.executar({
                email: req.body.email,
                senha: req.body.senha
            }
            );
            res.status(201).json(resposta); 
            } catch (e: any) {
                res.status(403).send(e.message);
            }
        });
    }
}