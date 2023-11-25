'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import {  useToDoStore } from "@/data/stores/useBookingStore";
import ListingCard from "@/listings/ListingCard";


const TripsClient: React.FC = () => {
  const [tasks] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    // axios.delete(`/api/reservations/${id}`)
    // .then(() => {
    //   toast.success('Reservation cancelled');
    //   router.refresh();
    // })
    // .catch((error) => {
    //   toast.error(error?.response?.data?.error)
    // })
    // .finally(() => {
    //   setDeletingId('');
    // })
  }, [router]);

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
         <h1>Trips</h1>
        {tasks.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
   );
}
 
export default TripsClient;