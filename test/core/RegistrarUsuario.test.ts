import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario";
import UsuarioEmMemoria from "../fake/UsuarioEmMemoria";
import InverterSenha from "../../src/adapters/auth/InverterSenha";
import SenhaComEspaco from "../../src/adapters/auth/SenhaComEspaco";
import BcryptAdapter from "../../src/adapters/auth/BcryptAdapter";
import ColecaoUsuarioDB from "../../src/adapters/db/ColecaoUsuarioDB";
import usuarios from "../data/usuarios";

test("Deve registrar um novo usuário invertendo a senha", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new InverterSenha();
  const casoDeuso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = await casoDeuso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João Silva");
  expect(usuario.senha).toBe("321");
});

test("Deve registrar um novo usuário com senha com espaços", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new SenhaComEspaco();
  const casoDeuso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = await casoDeuso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João Silva");
  expect(usuario.senha).toBe("1 2 3");
});

test("Deve registrar um novo usuário com senha criptografada", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new BcryptAdapter();
  const casoDeuso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = await casoDeuso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha,
  });
  //console.log(usuario.senha)

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João Silva");
  expect(provedorCripto.comparar("123", usuario.senha)).toBeTruthy();
});
test("Deve lançar erro ao cadastrar usuario ja cadastrado", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new BcryptAdapter();
  const casoDeuso = new RegistrarUsuario(colecao, provedorCripto);

  const nome = usuarios.completo.nome;
  const email = usuarios.completo.email;
  const senha = usuarios.completo.senha;

  await casoDeuso.executar({ nome, email, senha });

  const exec = async () => await casoDeuso.executar({ nome, email, senha });

  await expect(exec).rejects.toThrow("Usuário com esse e-mail já existe.");
});
test.skip("Deve registrar um novo usuário no banco real", async () => {
  const colecao = new ColecaoUsuarioDB();
  const provedorCripto = new BcryptAdapter();
  const casoDeuso = new RegistrarUsuario(colecao, provedorCripto);

  const usuario = await casoDeuso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha,
  });
  //console.log(usuario.senha)

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João Silva");
  expect(provedorCripto.comparar("123", usuario.senha)).toBeTruthy();
});
