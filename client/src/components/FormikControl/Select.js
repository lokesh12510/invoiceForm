import { Grid, MenuItem, TextField } from "@mui/material";
import { ErrorMessage, Field, FastField } from "formik";
import React from "react";

const Select = (props) => {
  const { name, label, options, tableField, ...rest } = props;
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
                error={errors[name] && touched[name]}
                fullWidth
                id={name}
                {...field}
                {...rest}
                select
                defaultValue={""}
                name="name"
                label={label}
                value={value}
                onChange={(e) => setFieldValue(name, e.target.value)}
                helperText={<ErrorMessage name={name} />}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.key}
                    </MenuItem>
                  );
                })}
              </TextField>
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
            select
            name="name"
            label={label}
            value={value}
            onChange={(e) => setFieldValue(name, e.target.value)}
            helperText={<ErrorMessage name={name} />}
          >
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.key}
                </MenuItem>
              );
            })}
          </TextField>
        );
      }}
    </FastField>
  );
};

export default Select;
