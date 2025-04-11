import { Listing } from '../../types/listings';
import { HiOutlineHeart } from 'react-icons/hi2';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { userData, zillowData, address } = listing;

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden border border-gray-200 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-4 hover:bg-gray-50 cursor-pointer">
      <div className="relative w-full h-[240px] lg:w-[240px] lg:h-[180px]">
        <div className="w-full h-full bg-gray-200"></div>
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
          aria-label="Add to favorites"
        >
          <HiOutlineHeart className="w-5 h-5 text-gray-700" />
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/60'}`}
            />
          ))}
        </div>
        <div className="absolute top-2 left-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <img src="/opendoor-logo.png" alt="" className="h-3.5" />
            Opendoor
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 p-4">
        <div className="text-2xl font-semibold text-gray-900 mb-2">
          ${(userData?.askingPrice ?? 0).toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 mb-1.5">
          <span>{zillowData?.bedrooms ?? 0}bd</span>
          <span className="text-gray-400">•</span>
          <span>{zillowData?.bathrooms ?? 0}ba</span>
          <span className="text-gray-400">•</span>
          <span>{(zillowData?.livingAreaValue ?? 0).toLocaleString()} ft²</span>
        </div>
        <div className="text-gray-600">
          <div className="truncate">{address?.formattedAddress ?? 'Address not available'}</div>
          <div>
            {address?.locality ?? 'City'}, {address?.stateCode ?? 'State'}
          </div>
        </div>
      </div>
    </div>
  );
}
