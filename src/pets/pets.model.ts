import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../users/users.model'; // Import the IUser interface

// Define the Pet interface
export interface IPet extends Document {
  name: string;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  type: string;
  level: number;
  experience: number;
  specialAbility: string;
  owner: IUser['_id']; // Reference to the User model
  createdAt: Date;
  updatedAt: Date;
}

// Create the Pet schema
const PetSchema: Schema = new Schema<IPet>(
  {
    name: { type: String, required: true },
    stats: {
      strength: { type: Number, required: true, default: 0 },
      agility: { type: Number, required: true, default: 0 },
      intelligence: { type: Number, required: true, default: 0 },
    },
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
      required: true,
    },
    type: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    experience: { type: Number, required: true, default: 0 },
    specialAbility: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Pet model
const Pet = mongoose.model<IPet>('Pet', PetSchema);

export default Pet;