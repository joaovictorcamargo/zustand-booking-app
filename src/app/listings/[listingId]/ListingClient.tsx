"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Listing, Reservation } from "@/types/index";
import { ToDoList } from "@/components/ToDoList/index";
import { ToDoListDone } from "@/components/ToDoListDone/index";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
}) => {
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    setIsLoading(true);

    // axios.post('/api/reservations', {
    //   totalPrice,
    //   startDate: dateRange.startDate,
    //   endDate: dateRange.endDate,
    //   listingId: listing?.id
    // })
    try {
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, listing?.id, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div className="text-start">
      <div className="text-2xl font-bold">{listing.title}</div>
      <div className="font-light text-neutral-500 mt-2">
        {listing.description}
      </div>
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
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
            src={listing.imageSrc}
            alt="Listing"
          />
        </div>
        <div>Hosted by {listing.name}</div>
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
          <div>{listing.guestCount} guests</div>
          <div>{listing.roomCount} rooms</div>
          <div>{listing.bathroomCount} bathrooms</div>
        </div>
        <ToDoList />
        <ToDoListDone />
      </div>
    </div>
  );
};

export default ListingClient;
