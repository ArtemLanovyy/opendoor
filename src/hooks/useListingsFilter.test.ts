import { renderHook, act } from '@testing-library/react';
import { useListingsFilter } from './useListingsFilter';
import { Listing } from '../types/listings.ts';

const mockListings = [
  {
    _id: '1',
    zillowData: { homeStatus: 'FOR_SALE' },
  },
  {
    _id: '2',
    zillowData: { homeStatus: 'SOLD' },
  },
  {
    _id: '3',
    zillowData: { homeStatus: 'FOR_SALE' },
  },
] as Listing[];

describe('useListingsFilter', () => {
  it('initializes with "all" filter', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));
    expect(result.current.filters.status).toBe('all');
    expect(result.current.filteredListings).toEqual(mockListings);
  });

  it('filters active listings', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('active');
    });

    expect(result.current.filters.status).toBe('active');
    expect(result.current.filteredListings).toHaveLength(2);
    expect(
      result.current.filteredListings.every(l => l.zillowData?.homeStatus === 'FOR_SALE')
    ).toBe(true);
  });

  it('filters sold listings', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('sold');
    });

    expect(result.current.filters.status).toBe('sold');
    expect(result.current.filteredListings).toHaveLength(1);
    expect(result.current.filteredListings[0].zillowData?.homeStatus).toBe('SOLD');
  });

  it('shows all listings when filter is "all"', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('sold');
    });
    act(() => {
      result.current.handleStatusChange('all');
    });

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filteredListings).toEqual(mockListings);
  });

  it('clears filters', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('sold');
    });
    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filteredListings).toEqual(mockListings);
  });

  it('handles listings without zillowData', () => {
    const listingsWithoutZillowData = [{ _id: '4' }] as Listing[];
    const { result } = renderHook(() => useListingsFilter(listingsWithoutZillowData));

    act(() => {
      result.current.handleStatusChange('active');
    });

    expect(result.current.filteredListings).toHaveLength(0);
  });
});
