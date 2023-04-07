import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { styled } from "@mui/material/styles";
import "react-quill/dist/quill.snow.css";
import CloseIcon from "@mui/icons-material/Close";
import { imgbbAPI } from "../../apis/apiConfig";
import ImageUploader from "quill-image-uploader";
import { useMutation } from "@tanstack/react-query";
import postApi from "../../apis/post.api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
Quill.register("modules/imageUploader", ImageUploader);

interface CreatePostProps {
  closeOpenModal: () => void;
}

const CreatePostWrapper = styled("div")(() => ({}));
const ButtonClose = styled(Button)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
}));

function CreatePost({ closeOpenModal }: CreatePostProps) {
  const {t} = useTranslation()
  const [content, setContent] = useState("");
  const createPostMutation = useMutation({
    mutationFn: (body: { content: string}) => postApi.createPost(body) 
  })
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"], // các nút format text
        ["link", "image"], // các nút insert link và image
        ["blockquote", "code-block"], // các nút insert blockquote và code-block
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // nút chọn header
        [{ list: "ordered" }, { list: "bullet" }], // nút chọn kiểu danh sách
        [{ script: "sub" }, { script: "super" }], // nút chọn kiểu script
        [{ indent: "-1" }, { indent: "+1" }], // nút thêm/xóa indent
        [{ direction: "rtl" }], // nút chuyển đổi hướng viết bài (trái sang phải)
        [{ size: ["small", false, "large", "huge"] }], // nút chọn font size
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // nút chọn màu sắc
      ],
      imageUploader: {
        upload: async (file: File) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);
    createPostMutation.mutate({content}, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      }
    })
  };
  return (
    <CreatePostWrapper>
      <form onSubmit={handleSubmit}>
        <Typography
          textAlign="center"
          variant="h3"
          fontSize={23}
          mb={2}
          fontWeight="bold"
        >
          {t("create post")}
        </Typography>
        <ButtonClose onClick={closeOpenModal}>
          <CloseIcon />
        </ButtonClose>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
        <Button type="submit">{t("post")}</Button>
      </form>
    </CreatePostWrapper>
  );
}

export default CreatePost;
