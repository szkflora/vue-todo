import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    hashedPsw: string;
}

const UserSchema: Schema<IUser> = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    hashedPsw: {type: String, required: true}
});

export const User = mongoose.model<IUser>('User', UserSchema);