import { renderHook, act } from '@testing-library/react';
import { useHeader } from './useHeader';

describe('useHeader', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHeader());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.isSidePanelOpen).toBe(false);
  });

  it('should update search query when handleSearchChange is called', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.handleSearchChange({
        target: { value: 'test search' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchQuery).toBe('test search');
  });

  it('should toggle side panel when toggleSidePanel is called', () => {
    const { result } = renderHook(() => useHeader());

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
    const { result: result1 } = renderHook(() => useHeader());
    const { result: result2 } = renderHook(() => useHeader());

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

    expect(result1.current.searchQuery).toBe('search 1');
    expect(result1.current.isSidePanelOpen).toBe(true);
    expect(result2.current.searchQuery).toBe('search 2');
    expect(result2.current.isSidePanelOpen).toBe(false);
  });
});
