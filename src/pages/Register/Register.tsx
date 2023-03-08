import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import InputForm from "../../components/InputForm/InputForm";
import InputPassword from "../../components/InputPassword";
import authAPI from "../../apis/auth.api";
import { schema } from "../../utils/rules";

type FormData = {
  name: string,
  email: string,
  password: string
}

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
    resolver: yupResolver(schema)
  });
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.registerAccount(body)
  })
  console.log(errors);
  const handleSubmitRegister = async (value: any) => {
    console.log(value);
    registerAccountMutation.mutate(value, {
      onSuccess: data => {
        console.log(data);
      },
      onError: (error) => {
        console.log("handleSubmitRegister ~ error:", error)
        
      }
    })
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
          <InputForm control={control} name="name" label="Tên" error={errors.name}/>
          <InputForm control={control} name="email" label="Email" error={errors.email}/>
          <InputPassword
            control={control}
            name="password"
            htmlForInput="password"
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
  );
}

export default Register;
