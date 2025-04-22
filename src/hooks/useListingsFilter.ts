import { useReducer } from 'react';
import { Listing } from '../types/listings';

export type ListingStatus = 'all' | 'active' | 'sold';

interface ListingFilters {
  status: ListingStatus;
}

interface FilterState {
  filters: ListingFilters;
}

type FilterAction =
  | { type: 'SET_FILTER_STATUS'; payload: ListingStatus }
  | { type: 'CLEAR_FILTERS' };

const initialState: FilterState = {
  filters: { status: 'all' },
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_FILTER_STATUS':
      return { ...state, filters: { ...state.filters, status: action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: { status: 'all' } };
    default:
      return state;
  }
}

export function useListingsFilter(listings: Listing[]) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const handleStatusChange = (status: ListingStatus) => {
    dispatch({ type: 'SET_FILTER_STATUS', payload: status });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const filteredListings = listings.filter(listing => {
    if (state.filters.status === 'all') return true;
    if (state.filters.status === 'active') return listing.zillowData?.homeStatus === 'FOR_SALE';
    if (state.filters.status === 'sold') return listing.zillowData?.homeStatus === 'SOLD';
    return true;
  });

  return {
    filters: state.filters,
    filteredListings,
    handleStatusChange,
    clearFilters,
  };
}
