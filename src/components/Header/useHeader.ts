import { useState } from 'react';

export const useHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
