import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../users/users.model';
import { IPet } from '../pets/pets.model';

export interface IGiftPet extends Document {
  sender: IUser['_id']; // User sending the pet
  receiver: IUser['_id']; // User receiving the pet
  pet: IPet['_id']; // Pet being gifted
  createdAt: Date;
}

const GiftPetSchema: Schema = new Schema<IGiftPet>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const GiftPet = mongoose.model<IGiftPet>('GiftPet', GiftPetSchema);

export default GiftPet;