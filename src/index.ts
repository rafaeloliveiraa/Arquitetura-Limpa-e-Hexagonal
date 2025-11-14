import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import BcryptAdapter from "./adapters/auth/BcryptAdapter";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import JwtAdapter from "./adapters/auth/JwtAdapter";

const app = express();
const porta = process.env.PORTA ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

//------------------------------------------------------------------ Rotas abertas

const ProvedorToken  = new JwtAdapter(process.env.JWT_SECRET!)
const provedorCripto = new BcryptAdapter();
const colecaoUsuario = new ColecaoUsuarioDB();

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto);
const loginUsuario = new LoginUsuario(colecaoUsuario, provedorCripto, ProvedorToken);
new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);

//------------------------------------------------------------------ Rotas protegidas
