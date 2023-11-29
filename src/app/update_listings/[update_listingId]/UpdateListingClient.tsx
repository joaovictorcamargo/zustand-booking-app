"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { eachDayOfInterval, differenceInDays, format } from "date-fns";
import { Booking, useToDoStore } from "@/data/stores/useBookingStore";
import { Range } from "react-date-range";
import DatePicker from "@/components/Calendar";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Image,
  Text,
  CardFooter,
  Button,
  Box,
} from "@chakra-ui/react";


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface UpdateListingClientProps {
  listing: Booking;
}

const UpdateListingClient: React.FC<UpdateListingClientProps> = ({
  listing,
}) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(listing?.totalPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [
    task,
] = useToDoStore(state => [
  state.tasks,
]);

const {
  updateTask,
} = useToDoStore();

console.log("🚀 ~ file: UpdateListingClient.tsx:39 ~ task:", task)

  // const initialDate: Range = {
  //   startDate: listing?.startDate ? new Date(listing.startDate) : undefined,
  //   endDate: listing?.endDate ? new Date(listing.endDate) : undefined,
  //   key: "selection",
  // };

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    task.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [task]);

  const reservationDate = useMemo(() => {
    if (!listing) {
      return null;
    }

    const start = new Date(listing.startDate);
    const end = new Date(listing.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [listing]);

  const onUpdateReservation = useCallback(() => {
    setIsLoading(true);

    try {
      updateTask({
        price: listing.price!,
        totalPrice,
        startDate: dateRange.startDate!,
        endDate: dateRange.endDate!,
        listingId: listing.id!,
        id: "1",
        createdAt: new Date(),
        imageSrc: listing.imageSrc!,
      });
    } catch {
      console.log("erro")
      toast.error("Something went wrong.");
    } finally {
      console.log("success")
      toast.success("Listing updated!");
      setDateRange(initialDateRange);
      router.push("/trips");
      setIsLoading(false);
    }
  }, [updateTask, listing, dateRange, totalPrice, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.totalPrice) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.totalPrice);
      }
    }
  }, [dateRange, listing?.price, listing?.totalPrice]);

  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image src={listing?.imageSrc} alt="Listing" borderRadius="lg" />
          <div className="font-light text-neutral-500">{reservationDate}</div>
          <Box>
            <Text color="blue.600" fontSize="2xl">
              {listing?.totalPrice}
              {"$"}
            </Text>
          </Box>
        </CardBody>
        <CardFooter>
          <div
            className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
      "
          >
            <DatePicker
              value={dateRange}
              disabledDates={disabledDates}
              onChange={(value) => setDateRange(value.selection)}
            />
            <div
              className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
            >
              <div>Total</div>
              <div>$ {totalPrice}</div>
            </div>
            <div className="p-4">
              <Button
                onClick={onUpdateReservation}
                variant="ghost"
                colorScheme="yellow"
              >
                Update
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
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
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        ></div>
        {/* <ToDoList /> */}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default UpdateListingClient;
