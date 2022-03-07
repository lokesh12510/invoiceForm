import React from "react";
import { Field, ErrorMessage, FastField } from "formik";
import ErrorText from "./ErrorText";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { Grid, TextField } from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function DatePicker(props) {
  const { label, name, tableField = false, className, ...rest } = props;
  return !tableField ? (
    <Grid container>
      <Grid item xs={5}>
        <label htmlFor={name} className="label_grid">
          {label}
        </label>
      </Grid>
      <Grid item xs={12} sm={7}>
        <FastField name={name}>
          {({ form, field }) => {
            const { setFieldValue, errors, touched } = form;
            const { value } = field;
            return (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDateTimePicker
                  renderInput={(props) => (
                    <TextField
                      fullWidth
                      className={className}
                      {...props}
                      error={errors[name] && touched[name]}
                      helperText={
                        <ErrorMessage component={ErrorText} name={name} />
                      }
                    />
                  )}
                  id={name}
                  {...field}
                  {...rest}
                  label={label}
                  value={value}
                  onChange={(val) =>
                    setFieldValue(name, val ? val._d.toISOString() : "")
                  }
                />
              </LocalizationProvider>
            );
          }}
        </FastField>
      </Grid>
    </Grid>
  ) : (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue, errors, touched } = form;
        const { value } = field;
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  error={errors[name] && touched[name]}
                  helperText={
                    <ErrorMessage component={ErrorText} name={name} />
                  }
                />
              )}
              id={name}
              {...field}
              {...rest}
              label={label}
              value={value}
              onChange={(val) =>
                setFieldValue(name, val ? val._d.toISOString() : "")
              }
            />
          </LocalizationProvider>
        );
      }}
    </Field>
  );
}

export default DatePicker;
