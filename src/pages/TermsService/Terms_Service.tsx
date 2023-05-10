import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { randomGradient } from "../../utils/utils";
import { Typography } from "@mui/material";

function TermsService() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          background: "linear-gradient(to right, #4158D0 , #FFCC70)",
          padding: "15px 50px",
        }}
      >
        <Typography
          variant="h3"
          fontSize="30px"
          sx={{
            textShadow: "0 0 0.2em #F87, 0 0 0.2em #F87",
            fontStyle: "italic",
            fontFamily: "Lobster",
          }}
        >
          Dsocial
        </Typography>
        <Link to="#">Chính sách và quy tắc của Dsocial</Link>
      </Box>
      <Box
        maxWidth="750px"
        margin="0 auto"
        padding="15px 20px"
        sx={{
          border: "1px solid #eee",
          mt: "15px",
          borderRadius: "15px",
          boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
        }}
      >
        <Typography variant="h1" fontSize="50px" textAlign="center" mb="15px">
          Điều khoản dịch vụ
        </Typography>
        <Typography mb="5px">
          Bạn không mất phí sử dụng Dsocial hay các sản phẩm và dịch vụ khác
          thuộc phạm vi điều chỉnh của những Điều khoản này, trừ khi chúng tôi
          có quy định khác. Thay vào đó, doanh nghiệp, tổ chức và những cá nhân
          khác sẽ phải trả tiền cho chúng tôi để hiển thị quảng cáo về sản phẩm
          và dịch vụ của họ cho bạn. Khi sử dụng Sản phẩm của chúng tôi, bạn
          đồng ý để chúng tôi hiển thị quảng cáo mà chúng tôi cho rằng có thể
          phù hợp với bạn và sở thích của bạn. Chúng tôi sử dụng dữ liệu cá nhân
          của bạn để xác định những quảng cáo được cá nhân hóa sẽ hiển thị cho
          bạn.
        </Typography>
        <Typography>
          Chúng tôi không bán dữ liệu cá nhân của bạn cho các nhà quảng cáo,
          cũng không chia sẻ thông tin trực tiếp nhận dạng bạn (chẳng hạn như
          tên, địa chỉ email hoặc thông tin liên hệ khác) với những đơn vị này
          trừ khi được bạn cho phép cụ thể.
        </Typography>
        <Typography
          variant="h2"
          fontSize="36px"
          fontWeight="600"
          color="#6ca0b6"
          lineHeight="44px"
          mb="24px"
        >
          1. Dịch vụ chúng tôi cung cấp
        </Typography>
        <Typography fontSize="16px" lineHeight="24px">
          Sứ mệnh của chúng tôi là đem đến cho mọi người khả năng xây dựng cộng
          đồng và đưa thế giới lại gần nhau hơn. Nhằm thúc đẩy sứ mệnh này,
          chúng tôi cung cấp các Sản phẩm và dịch vụ được mô tả dưới đây cho
          bạn:
        </Typography>
        <Box marginY="30px" display="flex">
          <Box
            width="5px"
            height="56px"
            marginLeft="18px"
            flexShrink="0"
            sx={{ backgroundColor: "#6ca0b6" }}
          ></Box>
          <Box paddingLeft="18px">
            <Box fontWeight="bold" fontSize="16px">
              Mang lại trải nghiệm dành riêng cho bạn:
            </Box>
            Trải nghiệm của bạn trên Dsocial không giống với của bất kỳ ai khác:
            từ các bài viết, tin, sự kiện, quảng cáo và nội dung khác mà bạn
            nhìn thấy trong Bảng tin Dsocial hoặc nền tảng video của chúng tôi
            cho đến các Trang Dsocial bạn theo dõi cùng những tính năng khác mà
            bạn có thể sử dụng (chẳng hạn như Facebook Marketplace) và tìm kiếm.
          </Box>
        </Box>
        <Box marginY="30px" display="flex">
          <Box
            width="5px"
            height="56px"
            marginLeft="18px"
            flexShrink="0"
            sx={{ backgroundColor: "#6ca0b6" }}
          ></Box>
          <Box paddingLeft="18px">
            <Box fontWeight="bold" fontSize="16px">
              Kết nối bạn với những người và tổ chức mà bạn quan tâm:
            </Box>
            Chúng tôi hỗ trợ bạn tìm và kết nối với mọi người, các nhóm, doanh
            nghiệp, tổ chức và những đối tượng khác quan trọng với bạn trên các
            Sản phẩm của Meta mà bạn sử dụng. Những mối quan hệ khăng khít hơn
            sẽ tạo ra các cộng đồng gắn bó hơn và chúng tôi tin rằng dịch vụ của
            mình hữu ích nhất khi mọi người được kết nối với nhau, cũng như với
            các nhóm và tổ chức mà họ quan tâm.
          </Box>
        </Box>
        <Typography
          variant="h2"
          fontSize="36px"
          fontWeight="600"
          color="#E9785B"
          lineHeight="44px"
          mb="24px"
        >
          2. Cách chúng tôi duy trì dịch vụ của mình
        </Typography>
        <Typography fontSize="16px" lineHeight="24px">
          Bảo vệ quyền riêng tư của mọi người chính là điều mà chúng tôi chú
          trọng khi thiết kế hệ thống quảng cáo của mình. Điều này nghĩa là
          chúng tôi có thể hiển thị cho bạn quảng cáo phù hợp và hữu ích mà
          không tiết lộ thông tin cá nhân của bạn với các nhà quảng cáo. Chúng
          tôi không bán dữ liệu cá nhân. Chúng tôi cho phép các nhà quảng cáo
          cung cấp thông tin như mục tiêu kinh doanh và kiểu đối tượng mà họ
          muốn hiển thị quảng cáo (ví dụ: những người trong độ tuổi từ 18-35
          thích đạp xe). Khi đó, chúng tôi sẽ hiển thị quảng cáo của họ cho
          những người có thể quan tâm.
        </Typography>
        <Typography
          variant="h2"
          fontSize="36px"
          fontWeight="600"
          color="#31A38D"
          lineHeight="44px"
          mb="24px"
        >
          3. Cam kết của bạn với Dsocial và cộng đồng của chúng tôi
        </Typography>
        <Typography fontSize="16px" lineHeight="24px">
          Chúng tôi cung cấp các dịch vụ này cho bạn và người khác nhằm thúc đẩy
          sứ mệnh của mình. Để đổi lại, chúng tôi cần bạn thực hiện các cam kết
          sau:
        </Typography>
        <Box marginY="30px" display="flex">
          <Box
            width="5px"
            height="56px"
            marginLeft="18px"
            flexShrink="0"
            sx={{ backgroundColor: "#6ca0b6" }}
          ></Box>
          <Box paddingLeft="18px">
            <Box fontWeight="bold" fontSize="16px">
              1. Những đối tượng có thể sử dụng Dsocial
            </Box>
            Khi đích danh mọi người nêu ý kiến và hành động, cộng đồng của chúng
            ta sẽ trở nên an toàn và có trách nhiệm hơn. Vì lý do đó, bạn:
            <ul>
              <li>
                Phải đặt cho tài khoản đúng tên mà bạn dùng trong cuộc sống hàng
                ngày.
              </li>
              <li>Phải cung cấp thông tin chính xác về bản thân.</li>
              <li>
                Chỉ được tạo một tài khoản (của riêng bạn) và sử dụng cho mục
                đích cá nhân.
              </li>
            </ul>
            Chúng tôi luôn cố gắng cung cấp Dsocial rộng rãi cho mọi người. Tuy
            nhiên, bạn sẽ không thể sử dụng Dsocial nếu:
            <ul>
              <li>Chưa đủ 13 tuổi</li>
              <li>Là tội phạm tình dục bị kết án.</li>
              <li>
                Bị cấm tiếp nhận các sản phẩm, dịch vụ hoặc phần mềm của chúng
                tôi theo luật hiện hành.
              </li>
            </ul>
          </Box>
        </Box>
        <Box marginY="30px" display="flex">
          <Box
            width="5px"
            height="56px"
            marginLeft="18px"
            flexShrink="0"
            sx={{ backgroundColor: "#6ca0b6" }}
          ></Box>
          <Box paddingLeft="18px">
            <Box fontWeight="bold" fontSize="16px">
              2. Những điều bạn có thể chia sẻ và thực hiện trên Sản phẩm của
              Dsocial
            </Box>
            Chúng tôi muốn mọi người sử dụng các Sản phẩm của Dsocial để thể
            hiện bản thân và chia sẻ nội dung quan trọng với họ, nhưng không
            phải với cái giá là sự an toàn và vui khỏe của người khác hay tính
            toàn vẹn của cộng đồng. Do đó, bạn đồng ý không tham gia những hành
            vi được mô tả dưới đây (hoặc tạo điều kiện hay hỗ trợ người khác
            thực hiện các hành vi đó):
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TermsService;
