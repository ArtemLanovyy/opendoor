import { renderHook, act } from '@testing-library/react';
import { useHeader } from './useHeader';
import { ListingsContext } from '../../context/ListingsContext';
import { ReactNode } from 'react';
import { vi } from 'vitest';

const mockListingsContext = {
  searchQuery: '',
  setSearchQuery: vi.fn(),
  listings: [],
  searchedListings: [],
  isLoading: false,
  error: null,
  fetchListings: vi.fn(),
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ListingsContext.Provider value={mockListingsContext}>{children}</ListingsContext.Provider>
);

describe('useHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockListingsContext.searchQuery = '';
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHeader(), { wrapper });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.isSidePanelOpen).toBe(false);
  });

  it('should update search query when handleSearchChange is called', () => {
    const { result } = renderHook(() => useHeader(), { wrapper });
    const newSearchValue = 'test search';

    act(() => {
      result.current.handleSearchChange({
        target: { value: newSearchValue },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockListingsContext.setSearchQuery).toHaveBeenCalledWith(newSearchValue);
  });

  it('should toggle side panel when toggleSidePanel is called', () => {
    const { result } = renderHook(() => useHeader(), { wrapper });

    expect(result.current.isSidePanelOpen).toBe(false);

    act(() => {
      result.current.toggleSidePanel();
    });
    expect(result.current.isSidePanelOpen).toBe(true);

    act(() => {
      result.current.toggleSidePanel();
    });
    expect(result.current.isSidePanelOpen).toBe(false);
  });

  it('should maintain independent state between instances', () => {
    const { result: result1 } = renderHook(() => useHeader(), { wrapper });
    const { result: result2 } = renderHook(() => useHeader(), { wrapper });

    act(() => {
      result1.current.handleSearchChange({
        target: { value: 'search 1' },
      } as React.ChangeEvent<HTMLInputElement>);
      result1.current.toggleSidePanel();
    });

    act(() => {
      result2.current.handleSearchChange({
        target: { value: 'search 2' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Check that setSearchQuery was called with correct values
    expect(mockListingsContext.setSearchQuery).toHaveBeenCalledWith('search 1');
    expect(mockListingsContext.setSearchQuery).toHaveBeenCalledWith('search 2');

    // Check local state (isSidePanelOpen) remains independent
    expect(result1.current.isSidePanelOpen).toBe(true);
    expect(result2.current.isSidePanelOpen).toBe(false);
  });
});
