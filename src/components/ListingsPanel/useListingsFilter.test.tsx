import { renderHook, act } from '@testing-library/react';
import { useListingsFilter } from './useListingsFilter';

const mockListings = [
  {
    _id: '1',
    zillowData: { homeStatus: 'SOLD' },
    address: {},
    userData: {},
  },
  {
    _id: '2',
    zillowData: { homeStatus: 'FOR_SALE' },
    address: {},
    userData: {},
  },
  {
    _id: '3',
    zillowData: { homeStatus: 'FOR_SALE' },
    address: {},
    userData: {},
  },
] as any; // Using 'as any' for brevity in test data

describe('useListingsFilter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    expect(result.current.filters.status).toBe('all');
    expect(result.current.isFiltersOpen).toBe(false);
    expect(result.current.filteredListings).toHaveLength(3);
  });

  it('should toggle filters panel', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.toggleFilters();
    });
    expect(result.current.isFiltersOpen).toBe(true);

    act(() => {
      result.current.toggleFilters();
    });
    expect(result.current.isFiltersOpen).toBe(false);
  });

  it('should filter active listings', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('active');
    });

    expect(result.current.filters.status).toBe('active');
    expect(result.current.filteredListings).toHaveLength(2);
    expect(result.current.filteredListings.every(l => l.zillowData.homeStatus === 'FOR_SALE')).toBe(
      true
    );
  });

  it('should filter sold listings', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('sold');
    });

    expect(result.current.filters.status).toBe('sold');
    expect(result.current.filteredListings).toHaveLength(1);
    expect(result.current.filteredListings.every(l => l.zillowData.homeStatus === 'SOLD')).toBe(
      true
    );
  });

  it('should show all listings when status is "all"', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('active');
    });
    expect(result.current.filteredListings).toHaveLength(2);

    act(() => {
      result.current.handleStatusChange('all');
    });
    expect(result.current.filteredListings).toHaveLength(3);
  });

  it('should clear filters', () => {
    const { result } = renderHook(() => useListingsFilter(mockListings));

    act(() => {
      result.current.handleStatusChange('active');
    });
    expect(result.current.filters.status).toBe('active');

    act(() => {
      result.current.clearFilters();
    });
    expect(result.current.filters.status).toBe('all');
    expect(result.current.filteredListings).toHaveLength(3);
  });

  it('should handle listings with missing status', () => {
    const listingsWithMissingStatus = [
      {
        _id: '1',
        zillowData: { homeStatus: null },
        address: {},
        userData: {},
      },
      {
        _id: '2',
        zillowData: { homeStatus: 'FOR_SALE' },
        address: {},
        userData: {},
      },
    ] as any;

    const { result } = renderHook(() => useListingsFilter(listingsWithMissingStatus));

    act(() => {
      result.current.handleStatusChange('active');
    });

    expect(result.current.filteredListings).toHaveLength(1);
    expect(result.current.filteredListings[0].zillowData.homeStatus).toBe('FOR_SALE');
  });

  it('should handle empty listings array', () => {
    const { result } = renderHook(() => useListingsFilter([]));

    expect(result.current.filteredListings).toHaveLength(0);

    act(() => {
      result.current.handleStatusChange('active');
    });
    expect(result.current.filteredListings).toHaveLength(0);
  });
});
