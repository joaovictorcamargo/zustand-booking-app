import create from 'zustand';

import { generateId } from '../helpers';

export interface Task {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    price: number;
    createdAt: Date,
    imageSrc: string
  }

interface ToDoStore {
    tasks: Task[];
    createTask: ({ 
        listingId,
        startDate,
        endDate,
        price,
        totalPrice,
        imageSrc
    }: Task) => void;
    updateTask: ({price, totalPrice, startDate, endDate, listingId, imageSrc}: Task) => void;
    removeTask: (id: string) => void;
    deleteEverything: () => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    createTask: ({price, totalPrice, startDate, endDate, listingId, imageSrc}: Task) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            price,
            totalPrice,
            startDate,
            endDate,
            listingId,
            createdAt: Date.now(),
            imageSrc
        }

        set({
            tasks: [newTask, ...tasks] as Task[],
        });
    },
    updateTask: ({price, totalPrice, startDate, endDate, listingId, imageSrc}: Task) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === listingId ? {price, totalPrice, startDate, endDate, listingId, imageSrc} : task,
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