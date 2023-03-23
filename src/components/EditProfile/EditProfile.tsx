import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DatePicker } from "@mui/x-date-pickers";
import DatePickers from "../DatePickers/DatePickers";
import axios from "axios";
import { Box, IconButton, InputBase, Tooltip } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { generateNameAvatar } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import { toast } from "react-toastify";
import { setUser } from "../../redux/user.slice";

function EditProfile() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(user?.avatar);

  const editProfileMutation = useMutation({
    mutationFn: (body) => userApi.updateUser(body),
  });

  const onSubmit = async (data: any) => {
    data.avatar = imageUrl ? imageUrl : user?.avatar || "";
    console.log(data);
    editProfileMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message)
        dispatch(setUser(data.data.data))
      },
      onError: (error) => {
        console.log(error)
      }
    })
  };
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();

    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   console.log(e.target?.result);
    //   setImageUrl(e.target?.result as string);
    // };
    // reader.readAsDataURL(file);

    formData.append("file", file);
    formData.append("upload_preset", "avatar_social");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/ds9ryghlt/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 200) {
      setImageUrl(res.data.url);
      // console.log(res.data.url); // link ảnh
      setValue("avatar", res.data.url);
    }
  };
  return (
    <div>
      <Typography textAlign={"center"} fontSize="23px">
        Chỉnh sửa thông tin cá nhân
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item xs={12} textAlign="center" my={2}>
            {user?.avatar ? (
              <Avatar
                variant="rounded"
                sx={{ margin: "0 auto", width: "130px", height: "130px" }}
                src={imageUrl}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{ margin: "0 auto", width: "130px", height: "130px" }}
                src={imageUrl}
              >
                {generateNameAvatar(user?.name as string)}
              </Avatar>
            )}

            <Box>
              <Tooltip title="Tải ảnh lên" arrow sx={{ display: "inline" }}>
                <Box>
                  <Input
                    // accept="image/*"
                    // {...field}
                    name="avatar"
                    sx={{ display: "none" }}
                    // className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                      <AddAPhotoIcon />
                    </IconButton>
                  </label>
                </Box>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <InputForm
              control={control}
              name="name"
              label="Tên"
              defaultValue={user?.name}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <DatePickers
              control={control}
              name="date_of_birth"
              defaultValue={null}
            /> */}
          </Grid>
          <Grid item xs={6}>
            <InputForm
              control={control}
              name="address"
              label="Địa chỉ"
              defaultValue={user?.address}
              error={errors.address}
            />
          </Grid>
          <Grid item xs={6}>
            <InputForm
              control={control}
              name="phone"
              label="Số điện thoại"
              defaultValue={user?.phone}
              error={errors.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <InputForm
              control={control}
              name="website"
              label="Website"
              defaultValue={user?.website}
              error={errors.website}
            />
          </Grid>
          <Grid item xs={6}>
            <InputForm
              control={control}
              name="bio"
              label="Giới thiệu"
              defaultValue={user?.bio}
              error={errors.bio}
            />
          </Grid>
        </Grid>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default EditProfile;
