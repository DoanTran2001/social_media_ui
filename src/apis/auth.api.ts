import { AuthResponse } from "../types/auth.type";
import http from "../utils/http";

const authAPI = {
  registerAccount: (body: { name: string, email: string, password: string }) => http.post<AuthResponse>('/auth/register', body),
  loginAccount: (body: {email: string, password: string}) => http.post<AuthResponse>('/auth/login', body)
}

export default authAPI