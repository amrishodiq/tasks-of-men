export type Priority = 'low' | 'medium' | 'high';

export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
    priority?: Priority;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}