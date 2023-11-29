import { Booking, useBookStore } from "@/data/stores/useBookingStore";

interface IParams {
  update_listingId?: string;
  }
  
  export default function useGetListingById(
    params: IParams
  ) {
    const [bookings] = useBookStore((state) => [
      state.tasks,
    ]);

    try {
      const { update_listingId } = params;
      const listing: Booking | undefined = bookings.find(item => `${item.id}` === update_listingId);

  
      if (!listing) {
        return null;
      }
  
      return {
        ...listing,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }   