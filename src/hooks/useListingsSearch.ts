import { useMemo } from 'react';
import { Listing } from '../types/listings';

export function useListingsSearch(listings: Listing[], searchQuery: string) {
  const searchedListings = useMemo(() => {
    if (!searchQuery.trim()) {
      return listings;
    }

    const query = searchQuery.toLowerCase().trim();
    return listings.filter(listing => {
      const address = listing.address;
      if (!address) return false;

      const searchableFields = [
        address.formattedAddress,
        address.streetNumber,
        address.route,
        address.locality,
        address.state,
        address.stateCode,
        address.zipcode,
        address.neighborhood,
      ].filter(Boolean);

      return searchableFields.some(field => field?.toLowerCase().includes(query));
    });
  }, [listings, searchQuery]);

  return searchedListings;
}
