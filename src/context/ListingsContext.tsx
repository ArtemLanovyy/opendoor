import { createContext, useContext, ReactNode } from 'react';
import { Listing } from '../types/listings';
import { useListingsSearch } from '../hooks/useListingsSearch';
import { useListingsFetch } from '../hooks/useListingsFetch';
import { useListingsFilter, ListingStatus } from '../hooks/useListingsFilter';
import { useListingsSort, SortOption } from '../hooks/useListingsSort';

interface ListingsContextType {
  // Data states
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  // Filter states
  filters: { status: ListingStatus };
  handleStatusChange: (status: ListingStatus) => void;
  clearFilters: () => void;

  // Sort states
  sortBy: SortOption;
  handleSortChange: (sortBy: SortOption) => void;

  // Derived states
  searchedListings: Listing[];
  filteredListings: Listing[];
  sortedListings: Listing[];

  // Actions
  setSearchQuery: (query: string) => void;
  fetchListings: () => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}

export function ListingsProvider({ children }: { children: ReactNode }) {
  // Fetch listings
  const { listings, isLoading, error, fetchListings } = useListingsFetch();

  // Search functionality
  const { searchQuery, setSearchQuery, searchedListings } = useListingsSearch(listings);

  // Filter functionality
  const { filters, filteredListings, handleStatusChange, clearFilters } =
    useListingsFilter(searchedListings);

  // Sort functionality
  const { sortBy, sortedListings, handleSortChange } = useListingsSort(filteredListings);

  const value = {
    // Data states
    listings,
    isLoading,
    error,
    searchQuery,

    // Filter states
    filters,
    handleStatusChange,
    clearFilters,

    // Sort states
    sortBy,
    handleSortChange,

    // Derived states
    searchedListings,
    filteredListings,
    sortedListings,

    // Actions
    setSearchQuery,
    fetchListings,
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}
