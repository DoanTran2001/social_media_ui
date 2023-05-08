import Comments from "../types/comments.type";
import http from "../utils/http";

const commentsApi = {
  getComment(idPost: string) {
    return http.get<Comments>(`/comment/${idPost}`);
  },
  comment(idPost: string, body: any) {
    return http.post(`/comment/${idPost}`, body);
  },
  replyComment(idPost: string, idComment: string, body: any) {
    return http.post(`/comment/${idPost}/${idComment}`, body);
  },
  editComment(idPost: string, idComment: string, body: { content: string }) {
    return http.put(`/comment/${idPost}/${idComment}`, body);
  },
  editReplyComment(
    postId: string,
    commentId: string,
    subcommentId: string,
    body: { content: string }
  ) {
    return http.put(`/comment/${postId}/${commentId}/${subcommentId}`, body);
  },
  deleteReplyComment(postId: string, commentId: string, replyId: string) {
    return http.delete(`/comment/posts/${postId}/comments/${commentId}/replyComment/${replyId}`)
  },
  deleteComment(postId: string, commentId: string) {
    return http.delete(`/comment/posts/${postId}/comments/${commentId}`)
  }
};

export default commentsApi;
