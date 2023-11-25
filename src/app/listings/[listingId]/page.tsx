"use client";

import getListingById from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  const listing = getListingById(params);

  return <ListingClient listing={listing!} />;
};

export default ListingPage;
