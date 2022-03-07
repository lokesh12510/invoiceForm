import React from "react";
import { Field } from "formik";

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label className="label_grid">{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
    </div>
  );
}

export default RadioButtons;
