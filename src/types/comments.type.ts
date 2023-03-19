export default interface Comments {
  success: boolean;
  message: string;
  data: {
    comments: CommentData[]
  }
}

export type CommentData = {
  _id: string;
  content: string;
  author: {
    _id: string,
    name: string
  }
  post: string;
  createdAt: string;
  updatedAt: string;
  subComments: SubComment[]
};

type SubComment = {
  author: string;
  content: string;
  createdAt: string;
  _id: string;
};

// const a = {
//   success: true,
//   message: "Lấy danh sách comment của bài đăng thành công",
//   data: {
//     comments: [
//       {
//         _id: "6405ec4326108a72adcabe92",
//         content: "Chỉnh sửa comment thứ nhất",
//         author: "6405e1f56f63dc3d316787e2",
//         post: "6405e2196f63dc3d316787e4",
//         createdAt: "2023-03-06T13:36:03.793Z",
//         updatedAt: "2023-03-07T03:49:49.837Z",
//         __v: 2,
//         subComments: [
//           {
//             author: "6405e1f56f63dc3d316787e2",
//             createdAt: "2023-03-06T15:06:01.885Z",
//             _id: "640601594aa3df701620a031",
//           },
//           {
//             author: "6405e1f56f63dc3d316787e2",
//             content: "Chỉnh sửa repcomment thứ hai nè",
//             createdAt: "2023-03-06T15:11:23.164Z",
//             _id: "6406029bc5f9e2a389498bbe",
//           },
//         ],
//       },
//       {
//         _id: "6405ec7526108a72adcabe97",
//         content: "Bình luận thứ hai",
//         author: "6405e1f56f63dc3d316787e2",
//         post: "6405e2196f63dc3d316787e4",
//         createdAt: "2023-03-06T13:36:53.931Z",
//         updatedAt: "2023-03-06T13:36:53.931Z",
//         __v: 0,
//         subComments: [],
//       },
//     ],
//   },
// };
