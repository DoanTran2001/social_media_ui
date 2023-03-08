import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useController } from 'react-hook-form'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface InputPasswordProps {
  htmlForInput: string,
  name: string,
  control: any,
}

function InputPassword(props: InputPasswordProps) {
  const { name, control, htmlForInput, } = props
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
    <FormControl sx={{ width: "100%" }} variant="standard">
      <InputLabel htmlFor={htmlForInput}>Password</InputLabel>
      <Input
        id={htmlForInput}
        type={showPassword ? "text" : "password"}
        {...field}
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
    </FormControl>
  );
}

export default InputPassword;
