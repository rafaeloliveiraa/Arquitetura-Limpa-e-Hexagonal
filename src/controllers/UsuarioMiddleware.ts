import { Request, Response } from "express";
import ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import ProvedorToken from "../core/usuario/ProvedorToken";

export default function UsuarioMiddleware(
    colecaoUsuario: ColecaoUsuario,
    provedorToken: ProvedorToken
) {
    return async (req: Request, res: Response, next: Function) => {
        const acessoNegado = () => res.status(403).send('Acesso negado, Token inválido.')
        try {
            const token = req.headers.authorization?.replace('Bearer ', '')
            if (!token) {
                acessoNegado()
                return
            }

            const usuarioToken = provedorToken.validarToken(token) as { id: string, nome: string, email: string }
            const usuario = await colecaoUsuario.buscarPorEmail(usuarioToken.email)
            if (!usuario) {
                acessoNegado()
                return
            }

            (req as any).usuario = usuario
            next()

        }   catch (e) {
            acessoNegado()
        }
    }
}