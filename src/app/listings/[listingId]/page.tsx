import getListingById from "@/app/actions/getListingById";
import { useMemo } from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  const listing = getListingById(params);

  if (!listing) {
    return <div>No listing</div>;
  }

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };
  
  return (
    <div className="text-start">
      <div className="text-2xl font-bold">{listing.title}</div>
      <div className="font-light text-neutral-500 mt-2">
        {listing.description}
      </div>
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <div
          className="
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
          <img
            className="
              object-cover 
              group-hover:scale-110 
              transition
            "
            src={listing.imageSrc}
            alt="Listing"
          />
        </div>
        <div>Hosted by {listing.name}</div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {listing.guestCount} guests
          </div>
          <div>
            {listing.roomCount} rooms
          </div>
          <div>
            {listing.bathroomCount} bathrooms
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
