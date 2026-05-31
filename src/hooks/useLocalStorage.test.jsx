import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('uses the initial value when nothing is saved yet', () => {
    const { result } = renderHook(() => useLocalStorage('count', 5));
    expect(result.current[0]).toBe(5);
  });

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('count', JSON.stringify(42));
    const { result } = renderHook(() => useLocalStorage('count', 0));
    expect(result.current[0]).toBe(42);
  });

  it('writes new values back to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => result.current[1](99));
    expect(result.current[0]).toBe(99);
    expect(JSON.parse(localStorage.getItem('count'))).toBe(99);
  });
});
