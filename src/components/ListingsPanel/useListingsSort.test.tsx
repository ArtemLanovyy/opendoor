import { renderHook, act } from '@testing-library/react';
import { useListingsSort } from './useListingsSort';

const mockListings = [
  {
    _id: '1',
    zillowData: {
      dateSold: new Date('2024-01-01').toISOString(),
      homeStatus: 'SOLD',
    },
    address: {},
    userData: {},
  },
  {
    _id: '2',
    zillowData: {
      dateSold: new Date('2024-02-01').toISOString(),
      homeStatus: 'FOR_SALE',
    },
    address: {},
    userData: {},
  },
  {
    _id: '3',
    zillowData: {
      dateSold: new Date('2024-03-01').toISOString(),
      homeStatus: 'FOR_SALE',
    },
    address: {},
    userData: {},
  },
] as any; // Using 'as any' for brevity in test data

describe('useListingsSort', () => {
  beforeEach(() => {
    // Setup a DOM element as a render target
    const div = document.createElement('div');
    div.setAttribute('id', 'dropdown-container');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    expect(result.current.sortBy).toBe('newest');
    expect(result.current.isDropdownOpen).toBe(false);
    expect(result.current.sortedListings).toHaveLength(3);
  });

  it('should sort listings by newest first by default', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    const sortedDates = result.current.sortedListings.map(l => l.zillowData.dateSold);
    expect(sortedDates).toEqual([
      new Date('2024-03-01').toISOString(),
      new Date('2024-02-01').toISOString(),
      new Date('2024-01-01').toISOString(),
    ]);
  });

  it('should sort listings by oldest first when changed', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    act(() => {
      result.current.handleSortChange('oldest');
    });

    const sortedDates = result.current.sortedListings.map(l => l.zillowData.dateSold);
    expect(sortedDates).toEqual([
      new Date('2024-01-01').toISOString(),
      new Date('2024-02-01').toISOString(),
      new Date('2024-03-01').toISOString(),
    ]);
  });

  it('should toggle dropdown visibility', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isDropdownOpen).toBe(true);

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isDropdownOpen).toBe(false);
  });

  it('should close dropdown when sort option is changed', () => {
    const { result } = renderHook(() => useListingsSort(mockListings));

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isDropdownOpen).toBe(true);

    act(() => {
      result.current.handleSortChange('oldest');
    });
    expect(result.current.isDropdownOpen).toBe(false);
    expect(result.current.sortBy).toBe('oldest');
  });

  it('should handle listings with missing dates', () => {
    const listingsWithMissingDates = [
      {
        _id: '1',
        zillowData: {
          dateSold: null,
          homeStatus: 'SOLD',
        },
        address: {},
        userData: {},
      },
      {
        _id: '2',
        zillowData: {
          dateSold: new Date('2024-02-01').toISOString(),
          homeStatus: 'FOR_SALE',
        },
        address: {},
        userData: {},
      },
    ] as any;

    const { result } = renderHook(() => useListingsSort(listingsWithMissingDates));

    const sortedDates = result.current.sortedListings.map(l => l.zillowData.dateSold);
    expect(sortedDates).toEqual([new Date('2024-02-01').toISOString(), null]);
  });

  it('should handle empty listings array', () => {
    const { result } = renderHook(() => useListingsSort([]));

    expect(result.current.sortedListings).toHaveLength(0);
  });

  it('should close dropdown when clicking outside', () => {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.setAttribute('id', 'dropdown-container');
    document.body.appendChild(dropdownDiv);

    const { result } = renderHook(() => useListingsSort(mockListings));

    result.current.dropdownRef.current = dropdownDiv;

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isDropdownOpen).toBe(true);

    act(() => {
      const insideClick = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      dropdownDiv.dispatchEvent(insideClick);
    });
    expect(result.current.isDropdownOpen).toBe(true);

    act(() => {
      const outsideClick = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      document.body.dispatchEvent(outsideClick);
    });
    expect(result.current.isDropdownOpen).toBe(false);
  });
});
