import Comments from "../types/comments.type"
import http from "../utils/http"

const commentsApi = {
  getComment(idPost: string) {
    return http.get<Comments>(`/comment/${idPost}`)
  },
  comment(idPost: string, body: any) {
    return http.post(`/comment/${idPost}`, body)
  },
  replyComment(idPost: string, idComment: string, body: any) {
    return http.post(`/comment/${idPost}/${idComment}`, body)
  }
}

export default commentsApi