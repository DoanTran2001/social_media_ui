import { Avatar, Modal, TextField, Box } from "@mui/material";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import { RootState } from "../../store";
import CreatePost from "../CreatePost";
import { useTranslation } from "react-i18next";
import GenerateAvatar from "../GenerateAvatar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  // root: {
  //   background: "linear-gradient(to right, #f6d365, #fda085)",
  //   "-webkit-background-clip": "text",
  //   "-webkit-text-fill-color": "transparent",
  // },
});

function InputPost() {
  const classes = useStyles();
  const {
    isOpen: openCreatePost,
    closeModal: closeModalCreatePost,
    openModal: openModalCreatePost,
  } = useModal();
  const user = useSelector((state: RootState) => state.user.user!);
  const { t } = useTranslation();
  return (
    <div>
      <TextField
        placeholder={`${user?.name} ơi, ${t("what do you think today")}`}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            color: "black", // Màu chữ
            // backgroundImage: "linear-gradient(to right, #f6d365, #fda085)", // Màu nền
            borderRadius: "25px", // Bo góc
            fontStyle: 'italic',
            marginY: '10px'
          },
        }}
        onClick={openModalCreatePost}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: "5px" }}>
              <GenerateAvatar name={user?.name} avatar={user?.avatar} />
            </Box>
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
