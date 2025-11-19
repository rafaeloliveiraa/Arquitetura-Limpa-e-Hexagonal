import axios from "axios";
import { getAutorizationHeader } from "../util/auth";
import transacoes from "../data/transacoes";

const baseUrl = process.env.API_URL;

test("Deve salvar uma transacao", async () => {
  try {
  const headers = await getAutorizationHeader()
  const resp = await axios.post(`${baseUrl}/transacao`, transacoes.semId, headers);
  expect(resp.status).toBe(200);
  } catch (e: any) {
    console.log(e.response.data);
    expect(e.response.status).toBe(400);
  }
});
test("Deve alterar uma transacao por id", async () => {
  try {
  const headers = await getAutorizationHeader()
  const resp = await axios.put(`${baseUrl}/transacao/6e20860d-ede5-4410-90b7-4063782f1775`, 
    {...transacoes.semId, valor: -175.58}, headers);
  expect(resp.status).toBe(200);
  } catch (e: any) {
    console.log(e.response.data);
    expect(e.response.status).toBe(400);
  }
});
