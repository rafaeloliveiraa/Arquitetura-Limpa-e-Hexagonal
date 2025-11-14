import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario";

const baseUrl = process.env.API_URL;

const usuario: Partial<Usuario> = {
  email: "anaa@zgmail.com",
  senha: "123456",
};
test("Deve registrar um usuário se não existir", async () => {
  try {
    const res = await axios.post(`${baseUrl}/registrar`, usuario);
    expect(res.status).toBe(201);
  } catch (e: any) {
    expect(e.response.status).toBe(400);
    expect(e.response.data).toEqual({
      erro: "Usuário com esse e-mail já existe.",
    });
  }
});
test("Deve logar com email e senha corretos", async () => {
  const res = await axios.post<{ usuario: Usuario; token: string }>(
    `${baseUrl}/login`,
    {
      email: usuario.email,
      senha: usuario.senha,
    }
  );
  expect(res.status).toBe(201);
  expect(res.data.usuario.email).toBe(usuario.email);
  console.log(res.data.token)
  expect(res.data.token).toBeDefined();
});
