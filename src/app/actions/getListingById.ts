import { Listing } from "@/types/index";
import { listings } from "@/utils";

interface IParams {
  listingId?: string;
}

export default function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing: Listing | undefined = listings.find(
      (item) => `${item.id}` === listingId
    );

    if (!listing) {
      return null;
    }

    return {
      ...listing,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
