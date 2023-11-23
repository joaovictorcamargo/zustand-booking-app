'use client';

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation } from "../types/index";
import { format } from "date-fns";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();


  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);
  console.log("🚀 ~ file: ListingCard.tsx:29 ~ price ~ price:", price);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  console.log(
    "🚀 ~ file: ListingCard.tsx:41 ~ reservationDate ~ reservationDate:",
    reservationDate
  );

  return (
    <div 
    onClick={() => router.push(`/listings/${data.id}`)} 
    >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
      </div>
   );
}
 
export default ListingCard;
