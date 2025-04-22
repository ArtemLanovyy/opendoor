import { renderHook, act } from '@testing-library/react';
import { useListingsSearch } from './useListingsSearch';
import { Listing } from '../types/listings.ts';

const mockListings = [
  {
    _id: '1',
    address: {
      formattedAddress: '123 Main St, Tampa, FL 33601',
      streetNumber: '123',
      route: 'Main St',
      locality: 'Tampa',
      state: 'Florida',
      stateCode: 'FL',
      zipcode: '33601',
      neighborhood: 'Downtown',
    },
  },
  {
    _id: '2',
    address: {
      formattedAddress: '456 Oak Ave, Tampa, FL 33602',
      streetNumber: '456',
      route: 'Oak Ave',
      locality: 'Tampa',
      state: 'Florida',
      stateCode: 'FL',
      zipcode: '33602',
      neighborhood: 'Heights',
    },
  },
] as Listing[];

describe('useListingsSearch', () => {
  it('initializes with empty search query', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));
    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchedListings).toEqual(mockListings);
  });

  it('updates search query and filters listings', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));

    act(() => {
      result.current.setSearchQuery('Main');
    });

    expect(result.current.searchQuery).toBe('Main');
    expect(result.current.searchedListings).toHaveLength(1);
    expect(result.current.searchedListings[0]._id).toBe('1');
  });

  it('handles case-insensitive search', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));

    act(() => {
      result.current.setSearchQuery('main');
    });

    expect(result.current.searchedListings).toHaveLength(1);
    expect(result.current.searchedListings[0]._id).toBe('1');
  });

  it('returns all listings when search query is empty', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.searchedListings).toEqual(mockListings);
  });

  it('searches across all address fields', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));

    // Test street number
    act(() => {
      result.current.setSearchQuery('456');
    });
    expect(result.current.searchedListings[0]._id).toBe('2');

    // Test neighborhood
    act(() => {
      result.current.setSearchQuery('Heights');
    });
    expect(result.current.searchedListings[0]._id).toBe('2');

    // Test zipcode
    act(() => {
      result.current.setSearchQuery('33601');
    });
    expect(result.current.searchedListings[0]._id).toBe('1');
  });

  it('handles listings without address', () => {
    const listingsWithoutAddress = [{ _id: '3' }] as Listing[];
    const { result } = renderHook(() => useListingsSearch(listingsWithoutAddress));

    act(() => {
      result.current.setSearchQuery('test');
    });

    expect(result.current.searchedListings).toHaveLength(0);
  });

  it('trims whitespace from search query', () => {
    const { result } = renderHook(() => useListingsSearch(mockListings));

    act(() => {
      result.current.setSearchQuery('  Main  ');
    });

    expect(result.current.searchQuery).toBe('  Main  ');
    expect(result.current.searchedListings).toHaveLength(1);
    expect(result.current.searchedListings[0]._id).toBe('1');
  });
});
