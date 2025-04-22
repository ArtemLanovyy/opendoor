import { useState, useCallback, useRef, useMemo } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';
import { GoogleMap, useLoadScript, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { useListings } from '../../context/ListingsContext.tsx';
import { Listing } from '../../types/listings.ts';

const TAMPA_CENTER = {
  lat: 27.9506,
  lng: -82.4572,
};

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 8,
  maxZoom: 20,
};

interface Property {
  id: string;
  lat: number;
  lng: number;
  price: number;
}

interface MapProps {
  onBoundsChanged?: (bounds: google.maps.LatLngBounds) => void;
  onPropertyClick?: (propertyId: string) => void;
}

const listingToProperty = (listing: Listing): Property => {
  return {
    id: listing._id,
    lat: listing.address.location[0],
    lng: listing.address.location[1],
    price: listing.userData.askingPrice,
  };
};

export function Map({ onBoundsChanged, onPropertyClick }: MapProps) {
  const { sortedListings } = useListings();

  const properties: Property[] = useMemo(
    () => sortedListings.map(listing => listingToProperty(listing)),
    [sortedListings]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) - 1);
    }
  };

  const handleBoundsChanged = () => {
    if (map && onBoundsChanged) {
      const bounds = map.getBounds();
      if (bounds) {
        onBoundsChanged(bounds);
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-[calc(100vh-64px)] bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-200 relative">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={TAMPA_CENTER}
        zoom={10}
        options={mapOptions}
        onLoad={onLoad}
        onBoundsChanged={handleBoundsChanged}
      >
        <MarkerClustererF>
          {clusterer => (
            <>
              {properties.map(property => (
                <MarkerF
                  key={property.id}
                  position={{ lat: property.lat, lng: property.lng }}
                  onClick={() => onPropertyClick?.(property.id)}
                  clusterer={clusterer}
                />
              ))}
            </>
          )}
        </MarkerClustererF>
      </GoogleMap>

      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-lg shadow-md flex flex-col divide-y">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-t-lg"
            onClick={handleZoomIn}
          >
            <HiOutlinePlus className="w-5 h-5" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-b-lg"
            onClick={handleZoomOut}
          >
            <HiOutlineMinus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
