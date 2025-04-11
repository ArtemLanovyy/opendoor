import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#71767c]">
        <FiSearch size={16} />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className="w-[200px] pl-6 pr-4 py-[6px] text-sm text-[#2a2c30] placeholder:text-[#71767c] bg-transparent focus:outline-none"
      />
    </div>
  );
};
