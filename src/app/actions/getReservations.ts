import { Task } from "@/data/stores/useToDoStore";


export default async function getReservations(
  params: Task[]
) {
  try {

    const safeReservations = params.map(
      (reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      // listing: {
      //   ...reservation.listing,
      //   createdAt: reservation.listing.createdAt.toISOString(),
      // },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}