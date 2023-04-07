import User from "./user.type";

export default interface Post {
  success: string;
  message: string;
  data: PostData[];
}

export type PostData = {
  _id: string;
  content: string;
  author: User;
  likes: {
    _id: string,
    name: string,
    avatar: string
  }[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
};
