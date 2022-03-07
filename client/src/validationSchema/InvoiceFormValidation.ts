import * as Yup from "yup";

// Invoice Form Validation Schema
export const InvoiceValidationSchema = Yup.object({
  provider_name: Yup.string().required("required"),
  participant_name: Yup.string().required("required"),
  inv_number: Yup.number()
    .typeError("You must specify a number")
    .required("required"),
  inv_date: Yup.date().required("required").nullable(),
  budget_allocation: Yup.string().required("required"),
  inv_items: Yup.array().of(
    Yup.object().shape({
      start_date: Yup.date().required("required"),
      end_date: Yup.date().required("required"),
      credit: Yup.string().required("required"),
      active: Yup.boolean().required("required"),
      item_num: Yup.number()
        .required("required")
        .typeError("You must specify a number"),
      desc: Yup.string().required("required"),
      unit: Yup.number()
        .required("required")
        .typeError("You must specify a number"),
      price: Yup.number()
        .required("required")
        .typeError("You must specify a number"),
      gst_code: Yup.string().required("required"),
      amount: Yup.number()
        .required("required")
        .typeError("You must specify a number"),
    })
  ),
});
