// Interface for invoiceList state from api
export interface InvoiceTableState {
  id: number;
  provider_name: string;
  participant_name: string;
  inv_number: string;
  inv_date: string;
  budget_allocation: string;
  total_amount: number;
  inv_doc: string;
  length: number;
}
