import ProvedorToken from "../../core/usuario/ProvedorToken"
import jwt from 'jsonwebtoken'

export default class JwtAdapter implements ProvedorToken {
    constructor(private segredo: string) {}

    gerarToken(payload: string | object): string {
        return jwt.sign(payload, this.segredo, { expiresIn: '1d' })
    }
    
    validarToken(token: string): string | object {
        return jwt.verify(token, this.segredo)
    }
}