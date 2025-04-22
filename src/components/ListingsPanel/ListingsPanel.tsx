import React, { useRef, useEffect } from 'react';
import { useListings } from '../../context/ListingsContext';
import { useListingsUI } from './useListingsUI';
import { ListingCard } from '../ListingCard/ListingCard';
import { OfferBanner } from '../OfferBanner/OfferBanner';
import { HiOutlineFunnel, HiChevronDown, HiMagnifyingGlass } from 'react-icons/hi2';

interface ListingsPanelProps {
  onListingClick?: (listingId: string) => void;
  selectedPropertyId?: string;
}

export function ListingsPanel({ onListingClick, selectedPropertyId }: ListingsPanelProps) {
  const {
    searchQuery,
    isLoading,
    error,
    filters,
    sortedListings,
    handleStatusChange,
    clearFilters,
    sortBy,
    handleSortChange,
  } = useListings();

  const {
    isFiltersOpen,
    isDropdownOpen,
    dropdownRef,
    toggleFilters,
    toggleDropdown,
    closeDropdown,
  } = useListingsUI();

  // Create a ref for the selected listing card
  const selectedListingRef = useRef<HTMLDivElement>(null);

  // Scroll to the selected listing when selectedPropertyId changes
  useEffect(() => {
    if (selectedPropertyId && selectedListingRef.current) {
      selectedListingRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPropertyId]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-72 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  const handleSortChangeWithUI = (newSortBy: typeof sortBy) => {
    handleSortChange(newSortBy);
    closeDropdown();
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-64px)] flex flex-col bg-white">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Homes for sale in Tampa</h1>
        <p className="text-[15px] text-gray-600">
          {sortedListings.length} listings found — Listed on the MLS. Provided by Opendoor
          Brokerage.
        </p>
        <div className="flex items-center gap-3 mt-10">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="h-9 px-3 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5"
            >
              {sortBy === 'newest' ? 'Newest' : 'Oldest'}
              <HiChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={() => handleSortChangeWithUI('newest')}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${sortBy === 'newest' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSortChangeWithUI('oldest')}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${sortBy === 'oldest' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  Oldest
                </button>
              </div>
            )}
          </div>
          <button
            onClick={toggleFilters}
            className={`h-9 px-3 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5 ${filters.status !== 'all' ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
          >
            <HiOutlineFunnel className="w-4 h-4" />
            More filters
            {filters.status !== 'all' && (
              <span className="ml-1.5 bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-xs">
                1
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {isFiltersOpen && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            {filters.status !== 'all' && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Listing Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    filters.status === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleStatusChange('active')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    filters.status === 'active'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleStatusChange('sold')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    filters.status === 'sold'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  Sold
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-6 py-4">
        {searchQuery && sortedListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <HiMagnifyingGlass className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No listings found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        ) : (
          sortedListings.map((listing, index) => {
            const isSelected = listing._id === selectedPropertyId;
            if (index === 2) {
              return (
                <React.Fragment key={listing._id}>
                  <OfferBanner />
                  <ListingCard
                    ref={isSelected ? selectedListingRef : null}
                    listing={listing}
                    onClick={onListingClick}
                    isSelected={isSelected}
                  />
                </React.Fragment>
              );
            }
            return (
              <ListingCard
                key={listing._id}
                ref={isSelected ? selectedListingRef : null}
                listing={listing}
                onClick={onListingClick}
                isSelected={isSelected}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
