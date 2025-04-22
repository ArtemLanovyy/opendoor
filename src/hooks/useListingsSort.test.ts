import { renderHook, act } from '@testing-library/react';
import { useListingsSort } from './useListingsSort';
import { Listing } from '../types/listings.ts';

const mockListings = [
  {
    _id: '1',
    zillowData: { dateSold: 978912000000 },
  },
  {
    _id: '2',
    zillowData: { dateSold: 1618185600000 },
  },
  {
    _id: '3',
    zillowData: { dateSold: 919123200000 },
  },
] as Listing[];

describe('useListingsSort', () => {
  it('initializes with "newest" sort order', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));
    expect(result.current.sortBy).toBe('newest');

    const sortedIds = result.current.sortedListings.map(l => l._id);
    expect(sortedIds).toEqual(['2', '1', '3']);
  });

  it('sorts by oldest', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    act(() => {
      result.current.handleSortChange('oldest');
    });

    expect(result.current.sortBy).toBe('oldest');
    const sortedIds = result.current.sortedListings.map(l => l._id);
    expect(sortedIds).toEqual(['3', '1', '2']);
  });

  it('handles listings without dateSold', () => {
    const listingsWithoutDates = [
      { _id: '1', zillowData: { dateSold: null } },
      { _id: '2', zillowData: { dateSold: 919123200000 } },
      { _id: '3', zillowData: {} },
    ] as Listing[];

    const { result } = renderHook(() => useListingsSort(listingsWithoutDates));

    // Active listings (null dateSold) should be first for newest sort
    expect(result.current.sortedListings).toHaveLength(3);
    expect(result.current.sortedListings[0]._id).toBe('2');
    expect(result.current.sortedListings[1]._id).toBe('1');
    expect(result.current.sortedListings[2]._id).toBe('3');

    // Switch to oldest
    act(() => {
      result.current.handleSortChange('oldest');
    });

    // Sold listings should be first for oldest sort
    expect(result.current.sortedListings[0]._id).toBe('1');
    expect(result.current.sortedListings[1]._id).toBe('3');
    expect(result.current.sortedListings[2]._id).toBe('2');
  });

  it('maintains sort order when switching between newest and oldest', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    // Switch to oldest
    act(() => {
      result.current.handleSortChange('oldest');
    });
    const oldestFirst = result.current.sortedListings.map(l => l._id);

    // Switch back to newest
    act(() => {
      result.current.handleSortChange('newest');
    });
    const newestFirst = result.current.sortedListings.map(l => l._id);

    expect(oldestFirst).toEqual(['3', '1', '2']);
    expect(newestFirst).toEqual(['2', '1', '3']);
  });

  it('handles empty listings array', () => {
    const { result } = renderHook(() => useListingsSort([]));
    expect(result.current.sortedListings).toEqual([]);
  });

  it('preserves original array order for same dates', () => {
    const listingsWithSameDates = [
      { _id: '1', zillowData: { dateSold: 919123200000 } },
      { _id: '2', zillowData: { dateSold: 919123200000 } },
    ] as Listing[];

    const { result } = renderHook(() => useListingsSort(listingsWithSameDates));
    const sortedIds = result.current.sortedListings.map(l => l._id);
    expect(sortedIds).toEqual(['1', '2']);
  });
});
