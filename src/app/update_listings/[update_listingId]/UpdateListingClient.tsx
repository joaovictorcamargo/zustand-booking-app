"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Listing } from "@/types/index";
import { ToDoList } from "@/components/ToDoList/index";
import {  Task, useToDoStore } from "@/data/stores/useBookingStore";
import ListingReservation from "@/components/ListingReservation";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface UpdateListingClientProps {
  listing: Task;
}

const UpdateListingClient: React.FC<UpdateListingClientProps> = ({
  listing,
}) => {
  const router = useRouter()

  const [tasks, createTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    tasks.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [listing]);

  const [isLoading, setIsLoading] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // const onCreateReservation = useCallback(() => {
  //   setIsLoading(true);

  //   try {
  //     createTask({
  //       totalPrice,
  //       startDate: dateRange.startDate!,
  //       endDate: dateRange.endDate!,
  //       listingId: listing.id!,
  //       id: "1",
  //       createdAt: new Date(),
  //       imageSrc: listing.imageSrc!
  //     });
  //   } catch {
  //     toast.error("Something went wrong.");
  //   } finally {
  //     toast.success("Listing reserved!");
  //     setDateRange(initialDateRange);
  //     router.push("/trips");
  //     setIsLoading(false);
  //   }
  // }, [totalPrice, dateRange, listing?.id, createTask, listing.imageSrc]);

  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

  //     if (dayCount && listing.price) {
  //       setTotalPrice(dayCount * listing.price);
  //     } else {
  //       setTotalPrice(listing.price);
  //     }
  //   }
  // }, [dateRange, listing.price]);

  return (
    <div className="text-start">
      {/* <div className="text-2xl font-bold">{listing?.title}</div>
      <div className="font-light text-neutral-500 mt-2">
        {listing?.description}
      </div> */}
      <div
        className="
          w-full
          h-[60vh]
          rounded-xl
          relative
        "
      >
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          <img
            className="
              object-cover 
              group-hover:scale-110 
              transition
            "
            src={listing?.imageSrc}
            alt="Listing"
          />
        </div>
        {/* <div>Hosted by {listing?.name}</div> */}
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          {/* <div>{listing?.guestCount} guests</div>
          <div>{listing?.roomCount} rooms</div>
          <div>{listing?.bathroomCount} bathrooms</div> */}
        </div>
        <div
          className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
        >
          {/* <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          /> */}
        </div>
        <ToDoList />
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default UpdateListingClient;
