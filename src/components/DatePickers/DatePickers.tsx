import React from "react";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
// import moment from "moment";
// import MomentUtils from "@date-io/moment";

interface DatePickersProps {
  control: any;
  name: string;
  defaultValue: string | null | Dayjs
}

function DatePickers({ control, name, defaultValue }: DatePickersProps) {
  const {t} = useTranslation()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={t("date of birth")}
            
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default DatePickers;
