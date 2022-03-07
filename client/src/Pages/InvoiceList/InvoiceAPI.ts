import { HttpClient } from "../../utils/httpClient";

const PATH = {
  getInvoice: "invoice/",
};

const getInvoiceList = (params, start, callback, error, next) => {
  start();
  return HttpClient.get(`${PATH.getInvoice}`, { params })
    .then(callback)
    .catch(error)
    .finally(next);
};

export const InvoiceAPI = {
  getInvoiceList,
};
