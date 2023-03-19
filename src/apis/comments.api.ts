import Comments from "../types/comments.type"
import http from "../utils/http"

const commentsApi = {
  getComment(idPost: string) {
    return http.get<Comments>(`/comment/${idPost}`)
  }
}

export default commentsApi