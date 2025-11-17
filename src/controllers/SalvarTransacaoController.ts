import { Express, Request, Response } from 'express'
import SalvarTransacao from '../core/transacao/SalvarTransacao';

export default class SalvarTransacaoController {

    constructor(
        private servidor: Express,
        private casoDeUso: SalvarTransacao,
        ...middleware: any[]
    ) {
        const fn = async (req: Request, res: Response) => {
            try {
            const resposta = await this.casoDeUso.executar()
            res.status(200).json(resposta); 
            } catch (e: any) {
                res.status(400).send(e.message);
            }
        }
        this.servidor.post('/transacao', middleware, fn);
    }
}