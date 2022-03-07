import React from "react";
import { Field, FastField } from "formik";
import { Checkbox } from "@mui/material";

function CheckboxGroup(props) {
  const { label, name, options, tableField, ...rest } = props;
  return !tableField ? (
    <div className="form-control">
      <label className="label_grid">{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue, errors, touched } = form;
          const { value } = field;
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  error={errors[name] && touched[name]}
                  id={option.value}
                  {...field}
                  {...rest}
                  checked={value}
                  onClick={(e) => setFieldValue((val) => !val)}
                />
              </React.Fragment>
            );
          });
        }}
      </Field>
    </div>
  ) : (
    <FastField name={name}>
      {({ form, field }) => {
        const { setFieldValue, errors, touched } = form;
        const { value } = field;
        return options.map((option) => {
          return (
            <React.Fragment key={option.key}>
              <Checkbox
                type="checkbox"
                error={errors[name] && touched[name]}
                id={option.value}
                {...field}
                {...rest}
                checked={value}
                onClick={(e) => setFieldValue((val) => !val)}
                inputProps={{ "aria-label": "Checkbox demo" }}
              />
            </React.Fragment>
          );
        });
      }}
    </FastField>
  );
}

export default CheckboxGroup;
