import { Avatar, Modal, TextField, Box } from "@mui/material";
import useModal from "../../hooks/useModal";
import CreatePost from "../CreatePost";

function InputPost() {
  const {
    isOpen: openCreatePost,
    closeModal: closeModalCreatePost,
    openModal: openModalCreatePost,
  } = useModal();
  return (
    <div>
      <TextField
        placeholder="Đoan ơi, Bạn đang nghĩ gì thế!"
        sx={{ width: "100%" }}
        onClick={openModalCreatePost}
        InputProps={{
          startAdornment: (
            <Avatar
              sx={{ width: 24, height: 24, mr: "5px" }}
              aria-label="avatar"
            >
              U
            </Avatar>
          ),
        }}
      />
      <Modal open={openCreatePost} onClose={closeModalCreatePost}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 2,
            border: "1px solid #eee",
            borderRadius: "10px",
            minWidth: "900px",
            minHeight: "400px",
          }}
        >
          <CreatePost closeOpenModal={closeModalCreatePost} />
        </Box>
      </Modal>
    </div>
  );
}

export default InputPost;
