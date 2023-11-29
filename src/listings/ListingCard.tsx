"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeListing } from "../types/index";
import { format } from "date-fns";
import { Booking, useBookStore } from "@/data/stores/useBookingStore";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Booking;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation }) => {
  const router = useRouter();

  const [removeTask] = useBookStore((state) => [state.removeTask]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      removeTask(reservation?.id!);
    },
    [removeTask, reservation?.id]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);


  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={reservation ? reservation?.imageSrc : data?.imageSrc}
            alt="Listing"
            borderRadius="lg"
          />
          <div className="font-light text-neutral-500">{reservationDate}</div>
          <Stack mt="6" spacing="3">
            <Heading size="md">{data?.title}</Heading>
            <Text>{data?.description}</Text>
            <Box display="flex" alignItems="baseline" gap="2">
              <Text color="blue.600" fontSize="2xl">
                {price}
                {"$"}
              </Text>
              {!reservation && <Text className="font-light">night</Text>}
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            {!reservation && (
              <Button onClick={() => router.push(`/listings/${data?.id}`)} variant="ghost" colorScheme="blue">
                Book
              </Button>
            )}
          </ButtonGroup>
          {reservation && (
            <ButtonGroup flexDir="column" gap="4">
              <Button variant="ghost" onClick={handleCancel} colorScheme="red">
                Cancel Reservation
              </Button>
              <Button
                onClick={() =>
                  router.push(`/update_listings/${reservation?.id}`)
                }
                colorScheme="yellow"
              >
                Update reservation
              </Button>
            </ButtonGroup>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ListingCard;
