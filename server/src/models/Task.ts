import mongoose, { Schema, Document } from "mongoose";

export enum Importance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface TaskI extends Document {
    title: string;
    description?: string;
    importance: Importance;
    dueDate: Date;
    creationDate: Date;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema<TaskI> = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    importance: {
        type: String,
        enum: Object.values(Importance),
        required: true
    },
    dueDate: {type: Date, required: true},
    creationDate: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

export const Task = mongoose.model<TaskI>('Task', TaskSchema);