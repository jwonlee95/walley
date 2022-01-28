export interface ITransaction {
  _id: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  memo: string;
  type: string;
}
