"use client";
import { useRouter } from "next/navigation";
import ListingCard from "@/listings/ListingCard";
import { listings } from "@/utils";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  return (
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
          m-6
        "
    >
      {listings.map((listing: any) => {
        return <ListingCard key={listing.id} data={listing} />;
      })}
      <Menu>
        <MenuButton as={Button}>
          Options
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push("/trips")}>My Trips</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
