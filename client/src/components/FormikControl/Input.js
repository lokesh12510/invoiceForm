import React from "react";
import { Field, ErrorMessage, FastField } from "formik";
import { Grid, TextField } from "@mui/material";

function Input(props) {
  const { label, name, type = "text", tableField = false, ...rest } = props;
  return !tableField ? (
    <Grid container>
      <Grid item xs={5}>
        <label htmlFor={name} className="label_grid">
          {label}
        </label>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue, errors, touched } = form;
            const { value } = field;
            return (
              <TextField
                type={type}
                fullWidth
                error={errors[name] && touched[name]}
                id={name}
                {...field}
                {...rest}
                label={label}
                value={value}
                onChange={(e) => setFieldValue(name, e.target.value)}
                helperText={<ErrorMessage name={name} />}
              />
            );
          }}
        </Field>
      </Grid>
    </Grid>
  ) : (
    <FastField name={name}>
      {({ form, field }) => {
        const { setFieldValue, errors, touched } = form;
        const { value } = field;
        return (
          <TextField
            error={errors[name] && touched[name]}
            id={name}
            {...field}
            {...rest}
            type={type}
            label={label}
            value={value}
            onChange={(e) => setFieldValue(name, e.target.value)}
          />
        );
      }}
    </FastField>
  );
}

export default Input;
