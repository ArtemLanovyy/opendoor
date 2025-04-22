import { useReducer } from 'react';
import { Listing } from '../types/listings';

export type SortOption = 'newest' | 'oldest';

interface SortState {
  sortBy: SortOption;
}

type SortAction = { type: 'SET_SORT'; payload: SortOption };

const initialState: SortState = {
  sortBy: 'newest',
};

function sortReducer(state: SortState, action: SortAction): SortState {
  switch (action.type) {
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

export function useListingsSort(listings: Listing[]) {
  const [state, dispatch] = useReducer(sortReducer, initialState);

  const handleSortChange = (sortBy: SortOption) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  const sortedListings = [...listings].sort((a, b) => {
    const dateA = new Date(a.zillowData?.dateSold || 0).getTime();
    const dateB = new Date(b.zillowData?.dateSold || 0).getTime();
    return state.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return {
    sortBy: state.sortBy,
    sortedListings,
    handleSortChange,
  };
}
