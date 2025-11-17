import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ColecaoUsuarioDB from "./adapters/db/ColecaoUsuarioDB";
import BcryptAdapter from "./adapters/auth/BcryptAdapter";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import JwtAdapter from "./adapters/auth/JwtAdapter";
import SalvarTransacao from "./core/transacao/SalvarTransacao";
import SalvarTransacaoController from "./controllers/SalvarTransacaoController";
import UsuarioMiddleware from "./controllers/UsuarioMiddleware";

const app = express();
const porta = process.env.PORTA ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

//------------------------------------------------------------------ Rotas abertas

const ProvedorToken = new JwtAdapter(process.env.JWT_SECRET!);
const provedorCripto = new BcryptAdapter();
const colecaoUsuario = new ColecaoUsuarioDB();

//registrar caso de uso
const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto);
//registrar controller
new RegistrarUsuarioController(app, registrarUsuario);
//registrar caso de uso
const loginUsuario = new LoginUsuario(
  colecaoUsuario,
  provedorCripto,
  ProvedorToken
);
//registrar controller
new LoginUsuarioController(app, loginUsuario);

//------------------------------------------------------------------ Rotas protegidas
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, ProvedorToken);

//registrar caso de uso
const salvarTransacao = new SalvarTransacao();
//registrar controller
new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware);
