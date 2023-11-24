"use client";

import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import { useToDoStore } from "@/data/stores/useToDoStore";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  const listing = getListingById(params);
  console.log("🚀 ~ file: page.tsx:14 ~ ListingPage ~ listing:", listing)

  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return <ListingClient listing={listing!} />;
};

export default ListingPage;
