//caso de uso
import ProvedorCriptografia from "./ProvedorCriptografia";
import ColecaoUsuario from "./ColecaoUsuario";
import Usuario from "./Usuario";
import CasoDeUso from "../shared/CasoDeUso";
import ProvedorToken from "./ProvedorToken";

export type EntradaLoginUsuario = { email: string, senha: string }
export type SaidaLoginUsuario =   {usuario: Usuario, token: string }

export default class LoginUsuario implements CasoDeUso<EntradaLoginUsuario, SaidaLoginUsuario> {
  constructor(
    private colecao: ColecaoUsuario,
    private provedorCripto: ProvedorCriptografia,
    private provedorToken: ProvedorToken
  ) {}

  async executar(dto: EntradaLoginUsuario): Promise<SaidaLoginUsuario> {
    const usuarioExistente = await this.colecao.buscarPorEmail(dto.email);
    if (!usuarioExistente) throw new Error('Usuário não encontrado.');

    const mesmaSenha = this.provedorCripto.comparar(dto.senha, usuarioExistente.senha);
    if (!mesmaSenha) throw new Error('Senha inválida.');
    return { 
      usuario: { ...usuarioExistente, senha: '' }, 
      token: this.provedorToken.gerarToken({ 
        id: usuarioExistente.id,
        nome: usuarioExistente.nome,
        email: usuarioExistente.email, 
      }) 
    }
  }
}
