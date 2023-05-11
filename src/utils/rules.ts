import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không đúng định dạng!"),
  name: yup.string().required("Tên không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không đươc để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải ít nhất 8 kí tự, ít nhất 1 kí tự hoa, 1 kí tự thường và 1 kí tự đặc biệt"
    ),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Mật khẩu cũ không được để trống"),
  newPassword: yup
    .string()
    .required("Mật khẩu mới không đươc để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải ít nhất 8 kí tự, ít nhất 1 kí tự hoa, 1 kí tự thường và 1 kí tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("newPassword")], "Xác nhận mật khẩu không khớp"),
});
