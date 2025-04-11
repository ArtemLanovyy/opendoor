import { useListings } from '../../context/ListingsContext';
import { ListingCard } from '../ListingCard/ListingCard';
import { HiOutlineFunnel } from 'react-icons/hi2';
import { HiChevronDown } from 'react-icons/hi2';

export function ListingsPanel() {
  const { listings, isLoading, error } = useListings();

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

  return (
    <div className="overflow-y-auto h-[calc(100vh-64px)] flex flex-col bg-white">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Homes for sale</h1>
        <p className="text-[15px] text-gray-600">
          {listings.length} listings found — Listed on the MLS. Provided by Opendoor Brokerage.
        </p>
        <div className="flex items-center gap-3 mt-10">
          <button className="h-9 px-3 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5">
            Newest
            <HiChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          <button className="h-9 px-3 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5">
            <HiOutlineFunnel className="w-4 h-4" />
            More filters
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
