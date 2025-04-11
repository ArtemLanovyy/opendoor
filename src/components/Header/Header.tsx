import { useHeader } from './useHeader';
import { FullHeader } from './FullHeader';
import { SmallHeader } from './SmallHeader';

export const Header = () => {
  const { searchQuery, isSidePanelOpen, handleSearchChange, toggleSidePanel } = useHeader();

  return (
    <>
      <FullHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <SmallHeader
        searchQuery={searchQuery}
        isSidePanelOpen={isSidePanelOpen}
        onSearchChange={handleSearchChange}
        onToggleSidePanel={toggleSidePanel}
      />
    </>
  );
};
