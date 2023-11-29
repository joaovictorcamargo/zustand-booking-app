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
    bookings: Booking[];
    createBooking: ({
        listingId,
        startDate,
        endDate,
        price,
        totalPrice,
        imageSrc,
    }: Booking) => void;
    updateBooking: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => void;
    removeBooking: (id: string) => void;
    deleteEverything: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
    bookings: [],
    createBooking: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => {
        const { bookings } = get();
        const newBooking = {
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
            bookings: [newBooking, ...bookings] as Booking[],
        });
    },
    updateBooking: ({
        price,
        totalPrice,
        startDate,
        endDate,
        listingId,
        imageSrc,
    }: Booking) => {
        const { bookings } = get();
        set({
            bookings: bookings.map((booking) =>
                booking.id === listingId
                    ? { ...booking, price, totalPrice, startDate, endDate, imageSrc }
                    : booking
            ),
        });
    },
    removeBooking: (id: string) => {
        const { bookings } = get();
        set({
            bookings: bookings.filter((booking) => booking.id !== id),
        });
    },
    deleteEverything: () => {
        set({}, true);
    },
}));
