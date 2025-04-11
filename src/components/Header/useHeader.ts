import { useState } from 'react';
import { useListings } from '../../context/ListingsContext';

export const useHeader = () => {
  const { searchQuery, setSearchQuery } = useListings();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return {
    searchQuery,
    isSidePanelOpen,
    handleSearchChange,
    toggleSidePanel,
  };
};
