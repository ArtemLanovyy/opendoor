import { useState } from 'react';
import { Listing } from '../../types/listings';

export type ListingStatus = 'all' | 'active' | 'sold';

interface ListingFilters {
  status: ListingStatus;
}

export function useListingsFilter(listings: Listing[]) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ListingFilters>({
    status: 'all',
  });

  const filteredListings = listings.filter(listing => {
    if (filters.status === 'all') return true;
    if (filters.status === 'active') return listing.zillowData?.homeStatus === 'FOR_SALE';
    if (filters.status === 'sold') return listing.zillowData?.homeStatus === 'SOLD';
    return true;
  });

  const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

  const handleStatusChange = (status: ListingStatus) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const clearFilters = () => {
    setFilters({ status: 'all' });
  };

  return {
    filters,
    isFiltersOpen,
    filteredListings,
    toggleFilters,
    handleStatusChange,
    clearFilters,
  };
}
