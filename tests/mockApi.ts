import { Page } from '@playwright/test';
import { API_BASE_URL } from '../src/lib/hn/constants';

export enum Flow {
  TOP = 'top',
  NEW = 'new',
  FAIL = 'fail',
  MANY_PAGES = 'many_pages',
}

export const MockHnItemIdsTop = [1, 2, 3, 4, 5];

export const MockHnItemIdsNew = [101, 102, 103];

export const MockHnItemIdsMany = Array.from({ length: 101 }, (_, i) => i + 1);

export const MockHnItem = {
  id: 1,
  title: 'Mocked story',
  by: 'mock_user',
  score: 123,
  time: Date.now() / 1000,
  url: 'https://example.com/story/1',
  descendants: 45,
};

export async function mockFeedApi(page: Page, feed: Flow) {
  const path =
    feed === Flow.TOP || feed === Flow.MANY_PAGES
      ? 'topstories'
      : feed === Flow.NEW
      ? 'newstories'
      : undefined;

  await page.route(`${API_BASE_URL}/${path}.json`, async (route) => {
    switch (feed) {
      case Flow.TOP:
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MockHnItemIdsTop),
        });
        break;

      case Flow.NEW:
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MockHnItemIdsNew),
        });
        break;

      case Flow.FAIL:
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to fetch stories' }),
        });
        break;

      case Flow.MANY_PAGES:
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MockHnItemIdsMany),
        });
        break;

      default:
        await route.continue();
    }
  });
}

export async function mockItemApi(page: Page) {
  await page.route(`${API_BASE_URL}/item/*.json`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MockHnItem),
    });
  });
}
