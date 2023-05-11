import { AuthResponse } from "../types/auth.type";
import http from "../utils/http";

const authAPI = {
  registerAccount: (body: { name: string; email: string; password: string }) =>
    http.post<AuthResponse>("/auth/register", body),
  loginAccount: (body: { email: string; password: string }) =>
    http.post<AuthResponse>("/auth/login", body),
  changePassword: (body: { oldPassword: string; newPassword: string }) =>
    http.put("/auth/change-password", body),
  forgotPassword: (body: { email: string }) =>
    http.post("/auth/forgot-password", body),
  resetPassword: (data: { token: string; password: string }) =>
    http.post(`/auth/reset-password/${data.token}`, {
      password: data.password,
    }),
  logout: () => {
    return http.post("/auth/logout");
  },
};

export default authAPI;
