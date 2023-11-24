import create from 'zustand';

import { generateId } from '../helpers';

export interface Task {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  }


interface ToDoStore {
    tasks: Task[];
    tasksDone: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    createTaskDone: () => void;
    deleteEverything: () => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    tasksDone: [],
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
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks, tasksDone } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
            tasksDone: [...tasksDone].concat(tasks.filter((task) => task.id === id)),
        });
    },
    deleteEverything: () => {
        set({}, true)
    },
}));