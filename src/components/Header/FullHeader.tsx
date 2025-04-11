import { FiChevronDown } from 'react-icons/fi';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

interface FullHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FullHeader = ({ searchQuery, onSearchChange }: FullHeaderProps) => {
  return (
    <header className="hidden xl:flex h-[64px] items-center px-40 bg-white border-b border-[#e7e7e7] sticky top-0 z-50">
      <Logo />

      <div className="flex items-center ml-8 absolute left-1/2 -translate-x-1/2">
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        <button className="flex items-center ml-6 text-[#2a2c30] text-sm font-medium hover:text-black relative">
          Recommended listings
          <span className="absolute top-0 -right-1 w-[6px] h-[6px] rounded-full bg-[#ff5d47]"></span>
        </button>
      </div>

      <div className="flex items-center ml-auto space-x-6">
        <a href="#" className="text-[#2a2c30] text-sm hover:text-black">
          Also selling?
        </a>
        <button className="flex items-center text-[#2a2c30] text-sm hover:text-black">
          More
          <FiChevronDown className="ml-1" strokeWidth={2} size={16} />
        </button>
        <button className="text-[#0061ff] text-sm font-semibold hover:text-[#004ecc]">
          Sign In
        </button>
      </div>
    </header>
  );
};
