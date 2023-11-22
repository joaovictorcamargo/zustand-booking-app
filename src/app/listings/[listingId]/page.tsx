import getListingById from "@/app/actions/getListingById";

interface IParams {
    listingId?: string;
  }

const ListingPage = ({ params }: { params: IParams }) => {
    const listing = getListingById(params);

    return (
        <div>{listing.title}</div>
    )
}

export default ListingPage