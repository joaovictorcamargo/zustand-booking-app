'use client';

import {  useToDoStore } from "@/data/stores/useBookingStore";
import ListingCard from "@/listings/ListingCard";


const TripsClient: React.FC = () => {
  const [tasks] = useToDoStore((state) => [
    state.tasks,
  ]);

  return (
      <div 
        className="
          mt-10
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
        {tasks.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
          />
        ))}
      </div>
   );
}
 
export default TripsClient;