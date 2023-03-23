import Post from "../types/post.type"
import http from "../utils/http"

const postApi = {
  getPostFromFriends() {
    return http.get<Post>(`/user/postFromFriends/list`)
  },
  createPost(body: {
    content: string
  }) {
    return http.post('/posts', body)
  },
  getPostByUser() {
    return http.get('/posts')
  }
}
export default postApi