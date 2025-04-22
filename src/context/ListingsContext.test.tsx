import { useListings } from './ListingsContext';
import { renderHook, act } from '@testing-library/react';
import { TestWrapper } from '../test/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ListingStatus } from '../hooks/useListingsFilter';

const mockListings = [
  {
    _id: '1',
    zillowData: {
      yearBuilt: 2020,
      lotSize: 5000,
      zestimate: 550000,
      rentZestimate: 3000,
      livingAreaValue: 2000,
      homeType: 'SINGLE_FAMILY',
      bedrooms: 3,
      bathrooms: 2,
      homeStatus: 'FOR_SALE',
      hdpUrl: 'https://zillow.com/1',
      dateSold: null,
      listing_sub_type: {
        is_FSBA: true,
        is_newHome: false,
        is_FSBO: false,
        is_pending: false,
        is_bankOwned: false,
        is_openHouse: false,
        is_forAuction: false,
        is_comingSoon: false,
        is_foreclosure: false,
      },
      hoaFee: null,
      schoolRating: 8,
      parkingSpaces: 2,
      hasPool: false,
    },
    address: {
      location: [27.9506, -82.4572],
      googlePlaceId: 'place1',
      formattedAddress: '123 Main St, San Francisco, CA 94105',
      state: 'California',
      stateCode: 'CA',
      streetNumber: '123',
      route: 'Main St',
      locality: 'San Francisco',
      county: 'San Francisco County',
      zipcode: '94105',
      kind: 'residential',
      friendlyUrl: '123-main-st-san-francisco-ca-94105',
      neighborhood: 'Downtown',
    },
    userData: {
      inspectionAvailability: [],
      askingPrice: 500000,
      wastewaterType: 'sewer',
      foundationIssues: false,
      hoaFee: null,
      hoaPeriod: null,
      linkToPhotos: null,
      updatedAskingPrice: [],
      arv: 600000,
      rent: 3500,
      rehabCost: 50000,
      relationship: 'owner',
      occupancy: 'vacant',
      isUnderContract: false,
      sellerCommission: null,
      description: 'Great property',
    },
  },
  {
    _id: '2',
    zillowData: {
      yearBuilt: 2018,
      lotSize: 6000,
      zestimate: 800000,
      rentZestimate: 4000,
      livingAreaValue: 2500,
      homeType: 'SINGLE_FAMILY',
      bedrooms: 4,
      bathrooms: 3,
      homeStatus: 'SOLD',
      hdpUrl: 'https://zillow.com/2',
      dateSold: 1704067200000, // 2024-01-01
      listing_sub_type: {
        is_FSBA: false,
        is_newHome: false,
        is_FSBO: false,
        is_pending: false,
        is_bankOwned: false,
        is_openHouse: false,
        is_forAuction: false,
        is_comingSoon: false,
        is_foreclosure: false,
      },
      hoaFee: 200,
      schoolRating: 9,
      parkingSpaces: 2,
      hasPool: true,
    },
    address: {
      location: [27.9507, -82.4573],
      googlePlaceId: 'place2',
      formattedAddress: '456 Oak St, San Francisco, CA 94106',
      state: 'California',
      stateCode: 'CA',
      streetNumber: '456',
      route: 'Oak St',
      locality: 'San Francisco',
      county: 'San Francisco County',
      zipcode: '94106',
      kind: 'residential',
      friendlyUrl: '456-oak-st-san-francisco-ca-94106',
      neighborhood: 'Marina',
    },
    userData: {
      inspectionAvailability: [],
      askingPrice: 750000,
      wastewaterType: 'sewer',
      foundationIssues: false,
      hoaFee: 200,
      hoaPeriod: 'monthly',
      linkToPhotos: null,
      updatedAskingPrice: [],
      arv: 850000,
      rent: 4500,
      rehabCost: 25000,
      relationship: 'agent',
      occupancy: 'tenant',
      isUnderContract: false,
      sellerCommission: 3,
      description: '',
    },
  },
  {
    _id: '3',
    zillowData: {
      yearBuilt: 2019,
      lotSize: 4500,
      zestimate: 650000,
      rentZestimate: 3500,
      livingAreaValue: 1800,
      homeType: 'SINGLE_FAMILY',
      bedrooms: 2,
      bathrooms: 2,
      homeStatus: 'FOR_SALE',
      hdpUrl: 'https://zillow.com/3',
      dateSold: null,
      listing_sub_type: {
        is_FSBA: true,
        is_newHome: false,
        is_FSBO: false,
        is_pending: false,
        is_bankOwned: false,
        is_openHouse: false,
        is_forAuction: false,
        is_comingSoon: false,
        is_foreclosure: false,
      },
      hoaFee: null,
      schoolRating: 7,
      parkingSpaces: 1,
      hasPool: false,
    },
    address: {
      location: [27.9508, -82.4574],
      googlePlaceId: 'place3',
      formattedAddress: '789 Pine St, San Francisco, CA 94107',
      state: 'California',
      stateCode: 'CA',
      streetNumber: '789',
      route: 'Pine St',
      locality: 'San Francisco',
      county: 'San Francisco County',
      zipcode: '94107',
      kind: 'residential',
      friendlyUrl: '789-pine-st-san-francisco-ca-94107',
      neighborhood: 'Financial District',
    },
    userData: {
      inspectionAvailability: [],
      askingPrice: 600000,
      wastewaterType: 'sewer',
      foundationIssues: false,
      hoaFee: null,
      hoaPeriod: null,
      linkToPhotos: null,
      updatedAskingPrice: [],
      arv: 700000,
      rent: 4000,
      rehabCost: 35000,
      relationship: 'owner',
      occupancy: 'vacant',
      isUnderContract: false,
      sellerCommission: null,
      description: 'Nice view',
    },
  },
];

describe('ListingsContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the initial fetch to return empty data
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: [] }),
    });
  });

  it('initializes with default values', async () => {
    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    expect(result.current.listings).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filters.status).toBe('all');
    expect(result.current.sortBy).toBe('newest');

    // Wait for initial fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  });

  it('fetches listings successfully', async () => {
    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Mock the manual fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    await act(async () => {
      await result.current.fetchListings();
    });

    expect(result.current.listings).toEqual(mockListings);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const errorMessage = 'Failed to fetch listings';
    global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.fetchListings();
    });

    expect(result.current.listings).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('filters active listings', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.fetchListings();
      result.current.handleStatusChange('active' as ListingStatus);
    });

    const activeListings = result.current.filteredListings.filter(
      listing => listing.zillowData.homeStatus === 'FOR_SALE'
    );
    expect(activeListings.length).toBe(2);
  });

  it('filters sold listings', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.fetchListings();
      result.current.handleStatusChange('sold' as ListingStatus);
    });

    const soldListings = result.current.filteredListings.filter(
      listing => listing.zillowData.homeStatus === 'SOLD'
    );
    expect(soldListings.length).toBe(1);
  });

  it('sorts listings by newest', async () => {
    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Mock the manual fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    await act(async () => {
      await result.current.fetchListings();
      result.current.handleSortChange('newest');
    });

    // For newest, listing with most recent dateSold or null (active) should be first
    const sortedListingsIds = result.current.sortedListings.map(listing => listing._id);

    expect(sortedListingsIds).toEqual(['2', '1', '3']);
  });

  it('sorts listings by oldest', async () => {
    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Mock the manual fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    await act(async () => {
      await result.current.fetchListings();
      result.current.handleSortChange('oldest');
    });

    // For oldest, listing with earliest dateSold or null (active) should be first
    const sortedListingsIds = result.current.sortedListings.map(listing => listing._id);

    expect(sortedListingsIds).toEqual(['1', '3', '2']);
  });

  it('filters listings by search query', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: mockListings }),
    });

    const { result } = renderHook(() => useListings(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.fetchListings();
      result.current.setSearchQuery('Pine');
    });

    const filteredListings = result.current.searchedListings.filter(listing =>
      listing.address.formattedAddress.toLowerCase().includes('pine')
    );
    expect(filteredListings.length).toBe(1);
  });
});
