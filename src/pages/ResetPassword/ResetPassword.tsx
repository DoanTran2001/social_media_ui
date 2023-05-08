import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputForm from "../../components/InputForm/InputForm";
import InputPassword from "../../components/InputPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import authAPI from "../../apis/auth.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../constants/path";

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Mật khẩu không đươc để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải ít nhất 8 kí tự, ít nhất 1 kí tự hoa, 1 kí tự thường và 1 kí tự đặc biệt"
    ),
});

function ResetPassword() {
  const { userId, token } = useParams();
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(resetPasswordSchema),
  });
  const resetPasswordMutation = useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authAPI.resetPassword(data),
  });
  const handleSubmitResetPassword = async (value: any) => {
    const dataValue = { token: token!, password: value.password as string };
    console.log(dataValue);
    resetPasswordMutation.mutate(dataValue, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message)
        navigate(path.login)
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, {
          position: 'top-center'
        })
      },
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" mb="15px">
        Đặt lại mật khẩu
      </Typography>
      <form
        action=""
        onSubmit={handleSubmit(handleSubmitResetPassword)}
        autoComplete="off"
      >
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
          Gửi
        </Button>
      </form>
    </Box>
  );
}

export default ResetPassword;
