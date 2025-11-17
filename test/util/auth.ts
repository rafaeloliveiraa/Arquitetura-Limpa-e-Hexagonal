import axios from "axios"
import usuarios from "../data/usuarios";

const baseUrl = process.env.API_URL;

export async function getAutorizationHeader() {
    const resp = await axios.post<{ token: string }>(`${baseUrl}/login`, usuarios.completo)
    return {
        headers: {
            Authorization: `Bearer ${resp.data.token}`
        }
    }
}