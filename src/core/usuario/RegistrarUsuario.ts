//caso de uso
import ProvedorCriptografia from "./ProvedorCriptografia";
import ColecaoUsuario from "./ColecaoUsuario";
import Usuario from "./Usuario";
import Id from "../shared/Id";
import CasoDeUso from "../shared/CasoDeUso";

export type EntradaRegistrarUsuario = {
  nome: string;
  email: string;
  senha: string;
};

export default class RegistrarUsuario implements CasoDeUso<EntradaRegistrarUsuario, Usuario> {
  constructor(
    private colecao: ColecaoUsuario,
    private provedorCripto: ProvedorCriptografia
  ) {}

  async executar(dto: EntradaRegistrarUsuario): Promise<Usuario> {
    const senhaCriptografada = this.provedorCripto.criptografar(dto.senha);

    const usuarioExistente = await this.colecao.buscarPorEmail(dto.email);
    if (usuarioExistente) {
      throw new Error('Usuário com esse e-mail já existe.');
    }

    const usuario: Usuario = {
      id: Id.gerar(),
      nome: dto.nome,
      email: dto.email,
      senha: senhaCriptografada,
    };
    this.colecao.inserir(usuario);

    return usuario;
  }
}
