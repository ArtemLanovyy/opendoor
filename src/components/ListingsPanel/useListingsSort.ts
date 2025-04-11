import { useState, useRef, useEffect } from 'react';
import { Listing } from '../../types/listings';

export type SortOption = 'newest' | 'oldest';

export function useListingsSort(listings: Listing[]) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedListings = [...listings].sort((a, b) => {
    const dateA = new Date(a.zillowData?.dateSold || 0).getTime();
    const dateB = new Date(b.zillowData?.dateSold || 0).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    setIsDropdownOpen(false);
  };

  return {
    sortBy,
    isDropdownOpen,
    dropdownRef,
    sortedListings,
    toggleDropdown,
    handleSortChange,
  };
}
