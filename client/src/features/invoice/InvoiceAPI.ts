import { HttpClient } from "../../utils/httpClient";

const PATH = {
  createInvoice: "invoice/create",
  upload: "invoice/upload",
};

const createInvoice = (payload, start, callback, error, next) => {
  start();
  return HttpClient.post(`${PATH.createInvoice}`, payload)
    .then(callback)
    .catch(error)
    .finally(next);
};

const uploadInvoice = (payload, start, callback, error, next) => {
  start();
  return HttpClient.post(`${PATH.upload}`, payload)
    .then(callback)
    .catch(error)
    .finally(next);
};

export const InvoiceAPI = {
  createInvoice,
  uploadInvoice,
};
