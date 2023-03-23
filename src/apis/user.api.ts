import http from "../utils/http"

const userApi = {
  updateUser: (body: any) => http.put('/user/update/user', body)
}

export default userApi