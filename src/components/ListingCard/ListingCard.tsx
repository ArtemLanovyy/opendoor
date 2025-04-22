import { Listing } from '../../types/listings';
import { HiOutlineHeart, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useState } from 'react';

interface ListingCardProps {
  listing: Listing;
  onClick?: (listingId: string) => void;
  isSelected?: boolean;
}

export const ListingCard = forwardRef<HTMLDivElement, ListingCardProps>(
  ({ listing, onClick, isSelected }, ref) => {
    const { userData, zillowData, address } = listing;
  // For now, we'll use an array of placeholder colors
  const placeholderImages = [
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % placeholderImages.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? placeholderImages.length - 1 : prev - 1));
  };

  const selectImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

    return (
      <div
        ref={ref}
        className={`flex flex-col lg:flex-row overflow-hidden border rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-4 hover:bg-gray-50 cursor-pointer transition-colors ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
        onClick={() => onClick?.(listing._id)}>
      <div className="relative w-full h-[240px] lg:w-[240px] lg:h-[180px]">
        <div
          className={`w-full h-full ${placeholderImages[currentImageIndex]} transition-colors duration-300`}
        ></div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all"
          aria-label="Previous image"
        >
          <HiChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all"
          aria-label="Next image"
        >
          <HiChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
          aria-label="Add to favorites"
        >
          <HiOutlineHeart className="w-5 h-5 text-gray-700" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {placeholderImages.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                i === currentImageIndex ? 'bg-white' : 'bg-white/60'
              }`}
              onClick={e => selectImage(e, i)}
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
);
