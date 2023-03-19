import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import InputForm from "../../components/InputForm/InputForm";
import InputPassword from "../../components/InputPassword";
import authAPI from '../../apis/auth.api'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


type FormData = {
  email: string;
  password: string;
};

const Wrapper = styled("div")(() => ({
  maxWidth: "350px",
  textAlign: "center",
  margin: "0 auto",
}));

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate()
  const loginAccountMutation = useMutation({
    mutationFn: (body: { email: string, password: string}) => authAPI.loginAccount(body)
  })
  const handleSubmitLogin = async (values: any) => {
    console.log(values);
    loginAccountMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        localStorage.setItem('userInfo-social-media', JSON.stringify(data.data.data?.user))
        navigate('/')
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
      },
    })
  }
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
          Đăng nhập
        </Typography>
        {/* <Box component="form" noValidate sx={{ mt: 1 }}> */}
        <form
          action=""
          onSubmit={handleSubmit(handleSubmitLogin)}
          autoComplete="off"
        >
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
            Đăng nhập
          </Button>
        </form>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Box>
    </Wrapper>
  )
}

export default Login
