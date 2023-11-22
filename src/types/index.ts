export type Reservation = {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    createdAt: Date;
  }

export type Listing = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  roomCount: number;
  bathroomCount: number;
  price: number;
  reservations?: Reservation[]
}


export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};