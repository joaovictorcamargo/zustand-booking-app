"use client";
import { useRouter } from "next/navigation";
import ListingCard from "@/listings/ListingCard";
import { listings } from "@/utils";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="
          pt-24
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
      {listings.map((listing: any) => {
        return <ListingCard key={listing.id} data={listing} />;
      })}
      <button onClick={() => router.push("/trips")}>My Trips</button>
    </div>
  );
}
