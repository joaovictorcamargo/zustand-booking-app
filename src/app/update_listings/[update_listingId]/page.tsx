"use client";

import useGetListingById from "@/app/actions/getReservationById";
import UpdateListingClient from "./UpdateListingClient";

interface IParams {
  update_listingId?: string;
}

const UpdateListingPage = ({ params }: { params: IParams }) => {
  const listing = useGetListingById(params);
  console.log("🚀 ~ file: page.tsx:12 ~ UpdateListingPage ~ listing:", listing)

  return <UpdateListingClient listing={listing!} />;
};

export default UpdateListingPage;
