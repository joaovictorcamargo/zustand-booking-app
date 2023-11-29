"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Listing } from "@/types/index";
import { useBookStore } from "@/data/stores/useBookingStore";
import ListingReservation from "@/components/ListingReservation";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  Text,
  CardFooter,
  Box,
} from "@chakra-ui/react";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: Listing;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const router = useRouter();

  const [tasks, createTask] = useBookStore((state) => [
    state.tasks,
    state.createTask,
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
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    setIsLoading(true);

    try {
      createTask({
        price: listing.price,
        totalPrice,
        startDate: dateRange.startDate!,
        endDate: dateRange.endDate!,
        listingId: listing.id!,
        id: "1",
        createdAt: new Date(),
        imageSrc: listing.imageSrc!,
      });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
      setIsLoading(false);
    }
  }, [createTask, listing.price, listing.id, listing.imageSrc, totalPrice, dateRange.startDate, dateRange.endDate, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  return (
    <div className="text-start">
      <Card maxW="sm">
        <CardBody>
          <Image src={listing?.imageSrc} alt="Listing" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{listing?.title}</Heading>
            <div>Hosted by {listing?.name}</div>
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
              <div>{listing?.guestCount} guests</div>
              <div>{listing?.roomCount} rooms</div>
              <div>{listing?.bathroomCount} bathrooms</div>
            </div>
            <Box display="flex" alignItems="baseline" gap="2">
              <Text color="blue.600" fontSize="2xl">
                {listing?.price}
                {"$"}
              </Text>
              {!listing && <Text className="font-light">night</Text>}
            </Box>
            <Text>{listing?.description}</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ListingReservation
            price={listing?.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </CardFooter>
      </Card>
      {/* <ToDoList /> */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ListingClient;
