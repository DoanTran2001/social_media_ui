import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import InputForm from "../../components/InputForm/InputForm";
import InputPassword from "../../components/InputPassword";
import authAPI from "../../apis/auth.api";
import { schema } from "../../utils/rules";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../constants/path";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Wrapper = styled("div")(() => ({
  maxWidth: "350px",
  textAlign: "center",
  margin: "0 auto",
}));

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.registerAccount(body),
  });
  const handleSubmitRegister = async (value: any) => {
    console.log(value);
    registerAccountMutation.mutate(value, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message);
        navigate(path.login);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
        console.log("handleSubmitRegister ~ error:", error);
      },
    });
  };
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        {/* <Box component="form" noValidate sx={{ mt: 1 }}> */}
        <form
          action=""
          onSubmit={handleSubmit(handleSubmitRegister)}
          autoComplete="off"
        >
          <InputForm
            control={control}
            name="name"
            label="Tên"
            error={errors.name}
          />
          <InputForm
            control={control}
            name="email"
            label="Email"
            error={errors.email}
          />
          <InputPassword
            control={control}
            name="password"
            htmlForInput="password"
            error={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
        </form>

        <Box>
          <Typography
            fontSize="14px"
            color="rgba(0,0,0,.87)"
            padding="0 5px"
            mb="10px"
          >
            Bằng việc đăng ký, bạn đã đồng ý với Dsocial về{" "}
            <Link
              to={path.terms_service}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "#ee4d2d",
                userSelect: "none",
              }}
            >
              Điều khoản dịch vụ
            </Link>{" "}
            &{" "}
            <Link
              to={path.communityStandards}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "#ee4d2d",
                userSelect: "none",
              }}
            >
              Tiêu chuẩn cộng đồng
            </Link>
          </Typography>
          <Box color="rgba(0,0,0,.26)">
            Bạn đã có tài khoản?
            <Link
              to={path.login}
              style={{
                textDecoration: "none",
                color: "#ee4d2d",
                userSelect: "none",
                fontWeight:"500",
                marginLeft: '5px'
              }}
            >
              Đăng nhập
            </Link>
          </Box>
        </Box>
        {/* </Box> */}
      </Box>
    </Wrapper>
  );
}

export default Register;
