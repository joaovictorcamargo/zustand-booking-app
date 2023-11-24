import create from 'zustand';

import { generateId } from '../helpers';

export interface Task {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    createdAt: number
  }

interface ToDoStore {
    tasks: Task[];
    createTask: ({ 
        listingId,
        startDate,
        endDate,
        totalPrice,
    }: Task) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    deleteEverything: () => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    createTask: ({totalPrice, startDate, endDate, listingId}: Task) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            totalPrice,
            startDate,
            endDate,
            listingId,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask, ...tasks] as Task[],
        });
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.totalPrice,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
    deleteEverything: () => {
        set({}, true)
    },
}));