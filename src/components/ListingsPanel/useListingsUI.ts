import { useState, useRef, useEffect } from 'react';

export function useListingsUI() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    isFiltersOpen,
    isDropdownOpen,
    dropdownRef,
    toggleFilters,
    toggleDropdown,
    closeDropdown: () => setIsDropdownOpen(false),
  };
}
