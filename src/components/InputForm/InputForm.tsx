import React from 'react'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

interface InputProps {
  label: string,
  name: string,
  type?: string,
  control: any,
  error: any
}

function InputForm({label,name, type= 'text', control, error } : InputProps) {
  console.log(error);
  
  const { field } = useController({
    control,
    name,
    defaultValue: ''
  })
  return (
    <TextField id="" label={label} type={type} {...field}  variant="standard" sx={{width: '100%', marginBottom: '10px'}}/>
  )
}

export default InputForm
