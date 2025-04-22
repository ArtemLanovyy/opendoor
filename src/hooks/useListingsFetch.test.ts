import { renderHook, act } from '@testing-library/react';
import { useListingsFetch } from './useListingsFetch';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockListings = [
  {
    _id: '1',
    zillowData: { homeStatus: 'FOR_SALE', dateSold: null },
    address: '123 Main St',
    userData: { name: 'John Doe' },
  },
  {
    _id: '2',
    zillowData: { homeStatus: 'SOLD', dateSold: '2024-01-01' },
    address: '456 Oak St',
    userData: { name: 'Jane Smith' },
  },
];

describe('useListingsFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the initial fetch to return empty data
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, deals: [] }),
    });
  });

  it('initializes with default values', async () => {
    const { result } = renderHook(() => useListingsFetch());

    expect(result.current.listings).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    // Wait for initial fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  });

  it('fetches listings successfully', async () => {
    const { result } = renderHook(() => useListingsFetch());

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
    const { result } = renderHook(() => useListingsFetch());

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const errorMessage = 'Network error';
    global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.fetchListings();
    });

    expect(result.current.listings).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('handles unsuccessful API response', async () => {
    const { result } = renderHook(() => useListingsFetch());

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: false }),
    });

    await act(async () => {
      await result.current.fetchListings();
    });

    expect(result.current.listings).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch listings');
  });

  it('handles manual fetch trigger', async () => {
    const { result } = renderHook(() => useListingsFetch());

    // Wait for initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

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
});
