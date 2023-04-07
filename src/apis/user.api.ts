import http from "../utils/http"

const userApi = {
  updateUser: (body: any) => http.put('/user/update/user', body),
  getFriendList(id: string) {
    return http.get(`/user/friends/${id}`)
  },
  getSuggestFriend() {
    return http.get('/user/friends-suggestions/list')
  },
  requestAddFriend(recipientId: string) {
    return http.post(`/user/friend-requests/${recipientId}`)
  },
  getListRequestFriend() {
    return http.get('/user/friend-requests/list')
  },
  responseRequestAddFriend(requestId: string, body: any) {
    return http.put(`/user/${requestId}`, body)
  },
  getUser(userId: string) {
    return http.get(`/user/${userId}`)
  }
}

export default userApi