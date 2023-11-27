"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation } from "../types/index";
import { format } from "date-fns";
import { useToDoStore } from "@/data/stores/useBookingStore";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box
} from "@chakra-ui/react";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation }) => {
  console.log("🚀 ~ file: ListingCard.tsx:22 ~ reservation:", reservation?.id);
  const router = useRouter();

  const [removeTask] = useToDoStore((state) => [state.removeTask]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    removeTask(reservation?.id!);
  }, []);

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
      <Card maxW="sm" onClick={() => router.push(`/listings/${data?.id}`)}>
        <CardBody>
          <Image
            src={reservation ? reservation?.imageSrc : data?.imageSrc}
            alt="Listing"
            borderRadius="lg"
          />
          <div className="font-light text-neutral-500">{reservationDate}</div>
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Box display='flex'  alignItems='baseline' gap="2">
            <Text color="blue.600" fontSize="2xl">
              {price}{"$"}
            </Text>
            {!reservation && <Text className="font-light">night</Text>}
            </Box>
            {reservation && (
              <button onClick={handleCancel}>Cancel reservation</button>
            )}
                  {reservation && (
        <button
          onClick={() => router.push(`/update_listings/${reservation?.id}`)}
        >
          Update reservation
        </button>
      )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="ghost" colorScheme="blue">
              Book
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ListingCard;
