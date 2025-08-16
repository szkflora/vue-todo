import mongoose, { Schema, Document } from "mongoose";

export interface UserI extends Document {
    firstName: string;
    lastName: string;
    email: string;
    pswHash: string;
}

const UserSchema: Schema<UserI> = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    pswHash: {type: String, required: true}
});

export const User = mongoose.model<UserI>('User', UserSchema);