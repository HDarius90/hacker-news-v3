import { API_BASE_URL, TIMEOUT_MS } from './constants';
import type { Feed, HnItem } from './types';

async function getJSON<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchFeedIds(feed: Feed): Promise<number[]> {
  const path = feed === 'top' ? 'topstories' : 'newstories';
  return getJSON<number[]>(`${API_BASE_URL}/${path}.json`);
}

export async function fetchPost(id: number): Promise<HnItem | null> {
  return getJSON<HnItem | null>(`${API_BASE_URL}/item/${id}.json`);
}
