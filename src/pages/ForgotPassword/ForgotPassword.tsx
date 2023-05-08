import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputForm from "../../components/InputForm/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import authAPI from "../../apis/auth.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { path } from "../../constants/path";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type FormData = {
  email: string;
};

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không đúng định dạng!"),
});

function ForgotPassword() {
  const [statusSendMail, setStatusSendMail] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: (body: { email: string }) => authAPI.forgotPassword(body),
  });
  const handleSubmitForgotPassword = async (value: any) => {
    console.log(value);
    forgotPasswordMutation.mutate(value, {
      onSuccess: (data) => {
        console.log(data);
        setStatusSendMail(true);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message, {
          position: "top-center",
        });
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {statusSendMail ? (
          <>
            <Typography component="h1" variant="h5" mb="15px">
              Kiểm tra Mail của bạn
            </Typography>
            <Typography sx={{ textAlign: "center", maxWidth: "400px" }}>
              Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến email của bạn
            </Typography>
            <Button>
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                style={{ textDecoration: "none" }}
                target="_blank" rel="noreferrer"
              >
                Mở email
              </a>
            </Button>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5" mb="15px">
              Quên mật khẩu
            </Typography>
            <Typography sx={{ textAlign: "center", maxWidth: "400px" }}>
              Chúng tôi sẽ gửi link đặt lại mật khẩu qua email bạn đăng ký trên
              hệ thống
            </Typography>
            <form
              action=""
              onSubmit={handleSubmit(handleSubmitForgotPassword)}
              autoComplete="off"
            >
              <InputForm
                control={control}
                name="email"
                label="Email"
                error={errors.email}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Gửi
              </Button>
            </form>
          </>
        )}

        <Link
          to={path.login}
          style={{ textDecoration: "none", display: "flex" }}
        >
          <ArrowBackIcon /> Quay về đăng nhập
        </Link>
      </Box>
    </>
  );
}

export default ForgotPassword;
