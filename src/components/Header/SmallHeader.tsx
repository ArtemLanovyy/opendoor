import { FiChevronDown } from 'react-icons/fi';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { MenuButton } from './MenuButton';

interface SmallHeaderProps {
  searchQuery: string;
  isSidePanelOpen: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSidePanel: () => void;
}

export const SmallHeader = ({
  searchQuery,
  isSidePanelOpen,
  onSearchChange,
  onToggleSidePanel,
}: SmallHeaderProps) => {
  return (
    <>
      <header className="xl:hidden h-[64px] flex items-center px-5 md:px-10 bg-white border-b border-[#e7e7e7] sticky top-0 z-50">
        <Logo />

        <div className="flex items-center ml-4 md:ml-8">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <button className="text-[#0061ff] text-sm font-semibold hover:text-[#004ecc] ml-auto">
          Sign In
        </button>

        <div className="ml-6">
          <MenuButton isOpen={isSidePanelOpen} onClick={onToggleSidePanel} />
        </div>
      </header>

      <div
        className={`xl:hidden fixed top-[64px] right-0 w-[300px] h-[calc(100vh-64px)] bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="space-y-6">
            <button className="w-full text-left text-[#2a2c30] text-sm font-medium hover:text-black py-2 flex items-center">
              Recommended{' '}
              <span className="relative">
                listings
                <span className="absolute top-0 -right-1 w-[6px] h-[6px] rounded-full bg-[#ff5d47]"></span>
              </span>
            </button>

            <a href="#" className="block text-[#2a2c30] text-sm hover:text-black py-2">
              Also selling?
            </a>

            <button className="w-full text-left flex items-center justify-between text-[#2a2c30] text-sm hover:text-black py-2">
              More
              <FiChevronDown strokeWidth={2} size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
