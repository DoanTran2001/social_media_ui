import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import moment from "moment";
import "../../locales/vi/moment";
import { Tooltip } from "@mui/material";
import { getDate } from "../../utils/utils";

interface CommentItemProps {
  name: string;
  content: string;
  createdAt: string;
  setOpenReply: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentContent = styled("div")(() => ({
  "& a": {
    textDecoration: "none",
    listStyle: "none",
    fontWeight: 600,
  },
}));

function CommentItem({ name, content, createdAt, setOpenReply }: CommentItemProps) {
  const date = moment(createdAt);
  moment.locale("vi");
  return (
    <Stack direction={"row"} gap={"5px"} mb="5px">
      <Avatar sx={{ width: "25px", height: "25px" }} />
      <CommentContent>
        <Link to={"/"}>{name}</Link>
        <Typography lineHeight={1.2}>{content}</Typography>
        <Box display={"flex"} alignItems="center" gap="10px">
          <Typography
            variant="body2"
            fontSize={"12px"}
            fontWeight="bold"
            fontStyle={"italic"}
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenReply(true)}
          >
            Phản hồi
          </Typography>
          <Tooltip title={getDate(new Date(createdAt))} arrow>
            <Typography variant="body1" fontSize="12px">
              {date.fromNow()}
            </Typography>
          </Tooltip>
        </Box>
      </CommentContent>
    </Stack>
  );
}

export default CommentItem;
