import ListingCard from '@/listings/ListingCard'
import { listings } from '@/utils'
import Image from 'next/image'

export default function Home() {


  return (
    <div className="pb-20 pt-28">
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4"
    >
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
          return (
            <ListingCard
            key={listing.id}
            data={listing}
          />
          )
        })}
      </div>
    </div>
    </div>
  )
}
