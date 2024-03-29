import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  control: any;
  error: any;
  defaultValue?: string,
  variant?: "standard" | "filled" | "outlined"
}

function InputForm({ label, name, type = "text", control, error, variant = "standard", defaultValue = "" }: InputProps) {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });
  return (
    <TextField
      id=""
      label={label}
      type={type}
      {...field}
      error={error}
      helperText={error ? error.message : ""}
      variant={variant}
      sx={{ width: "100%", marginBottom: "10px" }}
    />
  );
}

export default InputForm;
