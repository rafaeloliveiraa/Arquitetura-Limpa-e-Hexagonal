import Usuario from "../usuario/Usuario";

export default interface CasoDeUso<IN, OUT> {

    executar(dto: IN, usuario?: Usuario): Promise<OUT> //posso passar um param opcional para o id da empresa
}
// usar o usuario logado em casos de usos para validar permissoes, auditoria, etc