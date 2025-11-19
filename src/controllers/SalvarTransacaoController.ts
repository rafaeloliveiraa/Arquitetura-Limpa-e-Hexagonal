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
                const transacao = {
                    descricao: req.body.descricao,
                    valor: +req.body.valor,
                    vencimento: new Date(req.body.vencimento),
                    idUsuario: req.body.idUsuario,
                }

            await this.casoDeUso.executar({
                transacao: transacao,
                id: req.params.id as string,
                usuario: (req as any).usuario,
            })
            res.status(200).send(); 
            } catch (e: any) {
                res.status(400).send(e.message);
            }
        }
        //inserir
        this.servidor.post('/transacao', middleware, fn);
        //atualizar
        this.servidor.put('/transacao/:id', middleware, fn);
    }
}