export type Importance = 'Low' | 'Medium' | 'High'

export interface Task {
    id: number;
    title: string;
    description: string;
    importance: Importance;
    completed: boolean;
}