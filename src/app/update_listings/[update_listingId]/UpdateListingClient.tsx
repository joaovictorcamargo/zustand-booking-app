"use client";

import { useCallback, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { eachDayOfInterval, format } from "date-fns";
import { Task, useToDoStore } from "@/data/stores/useBookingStore";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/Calendar";
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
  listing: Task;
}

const UpdateListingClient: React.FC<UpdateListingClientProps> = ({
  listing,
}) => {
  const router = useRouter();

  const [tasks, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.updateTask,
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
  }, [tasks]);

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

    // try {
    //   createTask({
    //     totalPrice,
    //     startDate: dateRange.startDate!,
    //     endDate: dateRange.endDate!,
    //     listingId: listing.id!,
    //     id: "1",
    //     createdAt: new Date(),
    //     imageSrc: listing.imageSrc!,
    //   });
    // } catch {
    //   toast.error("Something went wrong.");
    // } finally {
    //   toast.success("Listing reserved!");
    //   setDateRange(initialDateRange);
    //   router.push("/trips");
    //   setIsLoading(false);
    // }
  }, []);

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
              onChange={(value) => setDateRange(value)}
            />
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
