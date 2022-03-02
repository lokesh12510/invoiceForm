import * as Yup from "yup";

export const InvoiceValidationSchema = Yup.object({
  provider_name: Yup.string().required("required"),
  participant_name: Yup.string().required("required"),
  inv_number: Yup.number().required("required"),
  inv_date: Yup.date().required("required").nullable(),
  budget_allocation: Yup.string().required("required"),
});
