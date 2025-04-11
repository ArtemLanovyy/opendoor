import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Listing, ListingsResponse } from '../types/listings';
import { useListingsSearch } from '../hooks/useListingsSearch';

interface ListingsContextType {
  listings: Listing[];
  searchedListings: Listing[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  error: string | null;
  fetchListings: () => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const LISTINGS_API_URL =
  'https://u2oyhiwlmc.execute-api.us-east-1.amazonaws.com/production/get-listings';

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchedListings = useListingsSearch(listings, searchQuery);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(LISTINGS_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ListingsResponse = await response.json();

      if (!data.success) {
        throw new Error('Failed to fetch listings');
      }

      setListings(data.deals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching listings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const value = {
    listings,
    searchedListings,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    fetchListings,
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}
