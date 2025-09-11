import mongoose, { Schema, Document } from "mongoose";

export enum Importance {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export interface ITask extends Document {
    title: string;
    description?: string;
    importance: Importance;
    dueDate: Date;
    creationDate: Date;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    importance: {
        type: Number,
        enum: Object.values(Importance).filter(value => typeof value === 'number')
    },
    dueDate: {type: Date, required: true},
    creationDate: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);