import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required('Email không được để trống!').email('Email không đúng định dạng!'),
  name: yup.string().required('Tên không được để trống'),
  password: yup.string().required('Mật khẩu không đươc để trống').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu phải ít nhất 8 kí tự, ít nhất 1 kí tự hoa, 1 kí tự thường và 1 kí tự đặc biệt')
})