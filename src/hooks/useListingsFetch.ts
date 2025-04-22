import { useReducer, useEffect } from 'react';
import { Listing, ListingsResponse } from '../types/listings';

interface FetchState {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
}

type FetchAction =
  | { type: 'SET_LISTINGS'; payload: Listing[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: FetchState = {
  listings: [],
  isLoading: true,
  error: null,
};

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const LISTINGS_API_URL =
  'https://u2oyhiwlmc.execute-api.us-east-1.amazonaws.com/production/get-listings';

export function useListingsFetch() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchListings = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch(LISTINGS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ListingsResponse = await response.json();
      if (!data.success) {
        throw new Error('Failed to fetch listings');
      }

      dispatch({ type: 'SET_LISTINGS', payload: data.deals });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'An error occurred while fetching listings',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings: state.listings,
    isLoading: state.isLoading,
    error: state.error,
    fetchListings,
  };
}
