import ListingCard from '@/listings/ListingCard'
import { listings } from '@/utils'
import Image from 'next/image'

export default function Home() {


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
          return (
            <ListingCard
            key={listing.id}
            data={listing}
          />
          )
        })}
    </div>
  )
}
