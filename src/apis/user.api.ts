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
  },
  getSavedIds() {
    return http.get('/user/getSaved/getSavedIds')
  },
  savedPost(data: { savedId: string, postId: string}) {
    return http.post(`/user/saved/${data.savedId}/${data.postId}`)
  },
  unSavedPost(data: { savedId: string, postId: string}) {
    return http.post(`/user/unsaved/${data.savedId}/${data.postId}`)
  },
  getSavedPost(data: { savedId: string, page: string, limit: string}) {
    return http.get(`/user/getSaved/saved-posts?key=${data.savedId}&page=${data.page}&limit=${data.limit}`)
  },
  createSaveKey(body: { key: string }) {
    return http.post('/user/saved/createSaveKey', body)
  },
  getFriendBirthdayToday() {
    return http.get('/user/friends/birthday/today')
  },
  getFriendBirthdayByMonth(month: number) {
    return http.get(`/user/friends/birthday/${month}`)
  },
  searchUser(query: string) {
    return http.get(`/user/search/user?q=${query}`)
  }
}

export default userApi