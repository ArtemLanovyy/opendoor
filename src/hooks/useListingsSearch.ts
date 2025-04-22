import { useReducer, useMemo } from 'react';
import { Listing } from '../types/listings';

interface SearchState {
  searchQuery: string;
}

type SearchAction = { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: SearchState = {
  searchQuery: '',
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function useListingsSearch(listings: Listing[]) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const searchedListings = useMemo(() => {
    if (!state.searchQuery.trim()) return listings;

    const query = state.searchQuery.toLowerCase().trim();
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
  }, [listings, state.searchQuery]);

  return {
    searchQuery: state.searchQuery,
    setSearchQuery,
    searchedListings,
  };
}
