export enum Importance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Task {
  _id: number;
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

export enum SortCriteria {
  TITLE = 'title',
  DESCRIPTION = 'description',
  IMPORTANCE = 'importance',
  DATE = 'dueDate'
}
