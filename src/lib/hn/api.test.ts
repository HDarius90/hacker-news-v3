import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchFeedIds, fetchItem } from './api';
import { BASE_URL } from './constants';

describe('hn api', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("fetchFeedIds calls correct endpoint for 'top' feeds and returns ids", async () => {
    const mockIds = [1, 2, 3, 4, 5];

    const mockFetch = vi.fn(async () => ({
      ok: true,
      json: async () => mockIds,
    }));
    vi.stubGlobal('fetch', mockFetch);

    const ids = await fetchFeedIds('top');

    expect(ids).toEqual(mockIds);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/topstories.json`,
      expect.any(Object)
    );
  });

  it("fetchFeedIds calls correct endpoint for 'new' feeds and returns ids", async () => {
    const mockIds = [10, 11, 12];

    const mockFetch = vi.fn(async () => ({
      ok: true,
      json: async () => mockIds,
    }));
    vi.stubGlobal('fetch', mockFetch);

    const ids = await fetchFeedIds('new');

    expect(ids).toEqual(mockIds);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/newstories.json`,
      expect.any(Object)
    );
  });

  it('fetchItem calls correct endpoint and returns item', async () => {
    const mockItem = { id: 123, title: 'Test' };

    const mockFetch = vi.fn(async () => ({
      ok: true,
      json: async () => mockItem,
    }));
    vi.stubGlobal('fetch', mockFetch);

    const item = await fetchItem(123);

    expect(item).toEqual(mockItem);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/item/123.json`,
      expect.any(Object)
    );
  });

  it('throws Error when response is not ok', async () => {
    const mockFetch = vi.fn(async () => ({ ok: false, status: 500 }));
    vi.stubGlobal('fetch', mockFetch);
    await expect(fetchFeedIds('top')).rejects.toThrow(/Request failed: 500/);
  });

  it('throws Error when request times out', async () => {
    vi.useFakeTimers();

    const mockFetch = vi.fn((_url, options) => {
      return new Promise((_resolve, reject) => {
        const signal = options?.signal as AbortSignal | undefined;
        if (signal) {
          if (signal.aborted) return reject(new Error('aborted'));
          signal.addEventListener('abort', () => reject(new Error('aborted')));
        }
      });
    });
    vi.stubGlobal('fetch', mockFetch);

    const promise = fetchFeedIds('top');

    vi.advanceTimersByTime(10000);

    await expect(promise).rejects.toThrow(/aborted/);

    vi.useRealTimers();
  });
});
