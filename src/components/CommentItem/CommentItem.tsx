import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface CommentItemProps {
  name: string,
  content: string
}

const CommentContent = styled('div')(() => ({
  '& a': {
    textDecoration: 'none',
    listStyle: 'none',
    fontWeight: 600
  }
}))


function CommentItem({ name, content }: CommentItemProps) {
  return (
    <Stack direction={'row'} gap={'5px'} mb="5px">
      <Avatar sx={{ width: "25px", height: "25px" }} />
      <CommentContent>
        <Link to={"/"}>{name}</Link>
        <Typography lineHeight={1.2}>
          {content}
        </Typography>
      </CommentContent>
    </Stack>
  );
}

export default CommentItem;
