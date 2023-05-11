import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useController } from 'react-hook-form'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface InputPasswordProps {
  htmlForInput: string,
  name: string,
  control: any,
  error: any,
  variant?: "standard" | "filled" | "outlined",
  label?: string
}

function InputPassword(props: InputPasswordProps) {
  const { name, control, htmlForInput, error, variant = "standard", label = "Password"} = props
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({
    control,
    name,
    defaultValue: ''
  })
  const handleToggleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormControl sx={{ width: "100%" }} variant={variant}>
      <InputLabel htmlFor={htmlForInput}>{label}</InputLabel>
      <Input
        id={htmlForInput}
        type={showPassword ? "text" : "password"}
        {...field}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleToggleShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && <FormHelperText sx={{color: 'red'}}>{error.message}</FormHelperText>}
    </FormControl>
  );
}

export default InputPassword;
