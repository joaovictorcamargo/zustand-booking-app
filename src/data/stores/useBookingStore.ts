import create from "zustand";

import { generateId } from "../helpers";

export interface Booking {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    price: number;
    createdAt: Date;
    imageSrc: string;
}

interface BookStore {
    tasks: Booking[];
    createTask: ({
        listingId,
        startDate,
        endDate,
        price,
        totalPrice,
        imageSrc,
    }: Booking) => void;
    updateTask: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => void;
    removeTask: (id: string) => void;
    deleteEverything: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
    tasks: [],
    createTask: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            price,
            totalPrice,
            startDate,
            endDate,
            listingId,
            createdAt: Date.now(),
            imageSrc,
        };

        set({
            tasks: [newTask, ...tasks] as Booking[],
        });
    },
    updateTask: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) =>
                task.id === listingId
                    ? { ...task, price, totalPrice, startDate, endDate, imageSrc }
                    : task
            ),
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
    deleteEverything: () => {
        set({}, true);
    },
}));
