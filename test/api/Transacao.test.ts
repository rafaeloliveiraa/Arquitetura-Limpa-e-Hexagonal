import axios from "axios";
import { getAutorizationHeader } from "../util/auth";

const baseUrl = process.env.API_URL;

test("Deve salvar uma transacao", async () => {
  const headers = await getAutorizationHeader()
  const resp = await axios.post(`${baseUrl}/transacao` , {}, headers);
  expect(resp.status).toBe(200);
});
