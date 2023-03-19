import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import ImgbbUploader from "imgbb-uploader";

function QuillEditor() {
  const [image, setImage] = useState("");
  // const handleImageUpload = async (file: File) => {
  //   const options = {
  //     apiKey: process.env.IMGBB_API_KEY,
  //     base64string: true,
  //   };
  //   const uploader = new ImgbbUploader(options);
  //   const response = await uploader.upload(file);
  //   setImage(response.url);
  // };
  // const modules = useMemo(() => {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     ["clean"]
  //   ],
  // }, []);
  return <ReactQuill  />;
}

export default QuillEditor;
