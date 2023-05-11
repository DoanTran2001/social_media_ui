import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

function CommunityStandards() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(to right, #4158D0 , #FFCC70)",
          padding: "15px 50px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Typography variant="h2" fontSize="30px" fontWeight="bold">
          Tiêu chuẩn cộng đồng của Dsocial
        </Typography>
      </Box>
      <Box
        maxWidth="900px"
        margin="15px auto"
        border="2px solid #eee"
        borderRadius="15px"
        mt="81px"
        boxShadow={
          "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
        }
        padding="10px 15px"
      >
        <Typography fontSize="20px" fontWeight="600">
          Giới thiệu
        </Typography>
        <Typography fontSize="18px" color="#1c2b33" my="16px">
          Hàng ngày, mọi người sử dụng Dsocial để chia sẻ trải nghiệm, kết nối
          với người thân và bạn bè, cũng như xây dựng cộng đồng. Đây là dịch vụ
          để hơn 2 tỷ người tự do thể hiện bản thân ở các quốc gia, nền văn hóa
          và bằng nhiều ngôn ngữ.
        </Typography>
        <Typography fontSize="18px" color="#1c2b33" my="16px">
          Các tiêu chuẩn này dựa trên ý kiến đóng góp của mọi người, cũng như ý
          kiến tư vấn của chuyên gia trong những lĩnh vực như công nghệ, an toàn
          cộng đồng và nhân quyền. Để đảm bảo ý kiến của mọi người đều được xem
          trọng, chúng tôi đã cố gắng xây dựng tiêu chuẩn bao hàm nhiều quan
          điểm và niềm tin khác nhau, nhất là quan điểm và niềm tin của những
          người, những cộng đồng yếu thế hoặc bị xem nhẹ.
        </Typography>
        <Typography>
          <b>
            Vui lòng lưu ý rằng Tiêu chuẩn cộng đồng bằng tiếng Anh (Mỹ) là
            phiên bản mới nhất của nhóm chính sách này và nên được dùng làm tài
            liệu chính.
          </b>
        </Typography>
        <iframe width="100%" height={480} src="https://www.youtube.com/embed/OUXHIejpiZ4" title="Student Conduct & Community Standards - Intro" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        <Typography fontSize="20px" fontWeight="600">
          Cam kết của chúng tôi đối với quyền bày tỏ ý kiến
        </Typography>
        <Typography fontSize="18px" color="#1c2b33" my="16px">
          Tiêu chuẩn cộng đồng của chúng tôi hướng đến mục tiêu tạo ra một nơi
          để mọi người biểu đạt và bày tỏ ý kiến. Dsocial muốn mọi người được
          trò chuyện cởi mở về những vấn đề quan trọng với họ, dù là bằng văn
          bản bình luận, ảnh, nhạc hay các phương tiện nghệ thuật khác, kể cả
          khi ai đó có thể không đồng ý hoặc phản đối họ. Trong một số trường
          hợp, chúng tôi vẫn cho phép nội dung vi phạm các tiêu chuẩn của mình,
          nếu đó là nội dung đáng đưa tin và phục vụ cho lợi ích cộng đồng.
          Chúng tôi chỉ làm điều này sau khi cân nhắc giữa giá trị lợi ích mang
          lại cho cộng đồng và nguy cơ gây hại, đồng thời tham khảo các tiêu
          chuẩn quốc tế về nhân quyền để đưa ra quyết định. Trong các trường hợp
          khác, chúng tôi có thể gỡ nội dung sử dụng ngôn ngữ khó hiểu hoặc ngụ
          ý khi ngữ cảnh bổ sung cho phép chúng tôi hiểu rõ một cách hợp lý rằng
          nội dung đó vi phạm các tiêu chuẩn.
        </Typography>
        <Grid container spacing="20px">
          <Grid item xs={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.8562-6/136893606_849918935579882_213472362566516880_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=tG9fnSONZVMAX-NCsOW&_nc_ht=scontent.fhan3-2.fna&oh=00_AfCEcC-6sC232OwqAtY8Q2dXMGCoD0v2aaS9YiqRfSaBbw&oe=64619E8F"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  TÍNH XÁC THỰC
                </Typography>
                <Typography variant="body2">
                  Chúng tôi muốn đảm bảo nội dung mọi người thấy trên DSocial
                  đều xác thực. Chúng tôi cho rằng tính xác thực sẽ tạo ra một
                  môi trường tốt hơn để chia sẻ. Do đó, chúng tôi không muốn mọi
                  người sử dụng DSocial để đưa thông tin sai lệch về việc họ là
                  ai và đang làm gì.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.xx.fbcdn.net/v/t39.8562-6/137256059_2800543870233431_455035967167740410_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=aT26AeMSuQ0AX_zPmz0&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBL1ymSSkdiuLw0Rk4n1unlwDTtT7jQZPsSPWHXu_noAA&oe=646195FE&_nc_fr=fhan3c02"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  AN TOÀN
                </Typography>
                <Typography variant="body2">
                  Chúng tôi cam kết biến DSocial thành một nơi an toàn. Chúng
                  tôi gỡ nội dung có thể làm tăng nguy cơ gây hại về an toàn thể
                  chất của con người. Nội dung đe dọa có khả năng bài trừ, hăm
                  dọa người khác hoặc khiến họ phải im lặng sẽ không được phép
                  xuất hiện trên DSocial.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.xx.fbcdn.net/v/t39.8562-6/137145103_308994903869841_4708570808613729754_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6825c5&_nc_ohc=-SWcuDVNYTMAX80qV67&_nc_ht=scontent.fhan3-3.fna&oh=00_AfC4v8u8wXFiVrIzRoN5ZyZvGGmUFQZB7HfUTKfCwT3V-g&oe=6461BFCC&_nc_fr=fhan3c03"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  QUYỀN RIÊNG TƯ
                </Typography>
                <Typography variant="body2">
                  Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin của cá
                  nhân. Nhờ có quyền riêng tư mà mọi người có thể tự do là chính
                  mình, tự do chọn cách thức và thời điểm chia sẻ trên Dsocial,
                  cũng như có thể kết nối dễ dàng hơn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.xx.fbcdn.net/v/t39.8562-6/137151366_203760844736656_1882032595123025998_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=1kMUPODIwMgAX_RatqM&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBNNPEM102HeKcZWXz79-tDO8J1Gg5xNA0WLhVeowK1LA&oe=6460808B&_nc_fr=fhan3c02"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  PHẨM GIÁ
                </Typography>
                <Typography variant="body2">
                  Chúng tôi tin rằng mọi người đều bình đẳng về phẩm giá và các
                  quyền. Chúng tôi muốn mọi người tôn trọng phẩm giá của người
                  khác, đồng thời không quấy rối hoặc làm mất thể diện của họ.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CommunityStandards;
