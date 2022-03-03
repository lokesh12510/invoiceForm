export interface IState {
  provider_name: string;
  participant_name: string;
  inv_number: string;
  inv_date: string | null;
  budget_allocation: string;
  inv_items: {
    start_date: string;
    end_date: string;
    credit: string;
    active: boolean;
    item_num: string;
    desc: string;
    unit: string;
    price: string;
    gst_code: string;
    amount: string;
  }[];
  total_amount: number;
  image: File | null;
}

export interface TotalState {
  grandTotal: number;
  setGrandTotal: React.Dispatch<React.SetStateAction<number>>;
}
