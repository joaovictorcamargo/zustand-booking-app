export type Reservation = {
    id: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    createdAt: Date;
    imageSrc: string
  }

export type Listing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  price: number;
  name: string;
  reservations?: Reservation[],
}


export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
