import React from "react";
import { Field, ErrorMessage, FastField } from "formik";
import { TextField } from "@mui/material";

function Textarea(props) {
  const { label, name, tableField, ...rest } = props;
  return !tableField ? (
    <div className="form-control">
      <label htmlFor={name} className="label_grid">
        {label}
      </label>
      <Field label={label} id={name} name={name} {...rest} />
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue, errors, touched } = form;
          const { value } = field;
          return (
            <TextField
              multiline
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
    </div>
  ) : (
    <FastField name={name}>
      {({ form, field }) => {
        const { setFieldValue, errors, touched } = form;
        const { value } = field;
        return (
          <TextField
            multiline
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
    </FastField>
  );
}

export default Textarea;
