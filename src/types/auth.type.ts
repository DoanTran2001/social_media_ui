import User from "./user.type";
import { ResponseApi } from "./utils.type";

export type AuthResponse = ResponseApi<{
  token: string,
  user?: User
}>