import { Types } from 'mongoose'

export enum Importance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Task {
  _id: Types.ObjectId | null;
  title: string;
  description: string;
  importance: Importance;
  dueDate: Date;
  creationDate: Date;
  completed: boolean;
}

export enum SortOrder {
  ASC = 'ascending',
  DSC = 'descending',
  UNO = 'unorganized',
}

export interface SortData {
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  dueDate: SortOrder;
}

export enum SortCriteria {
  TITLE = 'title',
  DESCRIPTION = 'description',
  IMPORTANCE = 'importance',
  DATE = 'dueDate'
}
