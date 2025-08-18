export enum Importance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  importance: Importance;
  date: Date;
  completed: boolean;
}

export enum SortOrder {
  ASC = 'ascending',
  DSC = 'descending',
  UNO = 'unorganized',
}
