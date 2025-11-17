import Transacao from "./Transacao";

export default interface ColecaoTransacao {
    inserir(transacao: Transacao): Promise<void>
    atualizar(transacao: Transacao): Promise<void>
    buscarPorId(id: string, idUsuario: string): Promise<Transacao | null>
    buscarPorMes(idUsuario: string, ano: number, mes: number): Promise<Transacao[]>
}