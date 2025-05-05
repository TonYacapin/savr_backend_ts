import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../users/users.model';

// Define the transaction structure
interface ITransaction {
    amount: number;
    date: Date;
  }
  

export interface ISavings extends Document {
  user: IUser['_id']; // Reference to the User model
  goalName: string; // Name of the savings goal
  targetAmount: number; // Target amount to save
  currentAmount: number; // Current amount saved
  isCompleted: boolean; // Whether the savings goal is completed
  transactions: ITransaction[]; // Array of transactions
  createdAt: Date;
  updatedAt: Date;
}
const SavingsSchema: Schema = new Schema<ISavings>(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      goalName: { type: String, required: true },
      targetAmount: { type: Number, required: true },
      currentAmount: { type: Number, required: true, default: 0 },
      isCompleted: { type: Boolean, required: true, default: false },
      transactions: [
        {
          amount: { type: Number, required: true },
          date: { type: Date, required: true, default: Date.now },
        },
      ],
    },
    {
      timestamps: true,
    }
  );
const Savings = mongoose.model<ISavings>('Savings', SavingsSchema);

export default Savings;