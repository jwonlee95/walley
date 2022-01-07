import Document from "mongoose";

export default interface IExtense extends Document {
  category: string;
  description: string;
  amount: number;
  balance: number;
}
