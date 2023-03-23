import React from "react";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import MomentUtils from "@date-io/moment";

interface DatePickersProps {
  control: any;
  name: string;
  defaultValue: string | null;
}

function DatePickers({ control, name, defaultValue }: DatePickersProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => <DatePicker {...field} />}
      />
    </LocalizationProvider>
  );
}

export default DatePickers;
