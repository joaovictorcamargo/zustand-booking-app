'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation } from "../types/index";
import { format } from "date-fns";
import { useToDoStore } from "@/data/stores/useBookingStore";

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
}) => {
  const router = useRouter();

  const [
    removeTask
] = useToDoStore(state => [
    state.removeTask,
]);


  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
    }, [reservation, data?.price]);

    const handleCancel = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  
      removeTask(reservation?.id!)
    }, []);

    const reservationDate = useMemo(() => {
      if (!reservation) {
        return null;
      }
    
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
  
      return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

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
            src={reservation ? reservation?.imageSrc : data?.imageSrc}
            alt="Listing"
          />
           <div className="font-light text-neutral-500">
          {reservationDate}
        </div>
          <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {reservation && (
        <button onClick={handleCancel}>Cancel reservation</button>
        )}
            {reservation && (
        <button     onClick={() => router.push(`/update_listings/${reservation.id}`)} 
        >Update reservation</button>
        )}
      </div>
   );
}
 
export default ListingCard;
