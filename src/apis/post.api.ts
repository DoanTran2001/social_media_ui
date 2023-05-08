import Post from "../types/post.type";
import http from "../utils/http";

const postApi = {
  getPostFromFriends() {
    return http.get<Post>(`/user/postFromFriends/list`);
  },
  createPost(body: { content: string }) {
    return http.post("/posts", body);
  },
  editPost(body: { content: string; postId: string }) {
    return http.put(`/posts/${body.postId}`, { content: body.content });
  },
  getPostByUser() {
    return http.get("/posts");
  },
  getPostAUser(id: string) {
    return http.get(`/posts/${id}`);
  },
  likePost(idPost: string) {
    return http.post(`/posts/likes/${idPost}`);
  },
  unLikePost(idPost: string) {
    return http.delete(`/posts/unlikes/${idPost}`);
  },
  sharePost(idPost: string) {
    return http.post(`/posts/shares/${idPost}`);
  },
};
export default postApi;
