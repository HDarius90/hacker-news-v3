import type { Page, Locator } from '@playwright/test';

export const selectHTML = (page: Page): Locator => page.locator('html');

export const selectBody = (page: Page): Locator => page.locator('body');

export const selectSpinner = (page: Page): Locator =>
  page.locator('[data-testid="spinner"]');

export const selectHeader = (page: Page): Locator => page.getByRole('banner');

export const selectTopTab = (page: Page): Locator =>
  selectHeader(page).getByRole('tab').nth(0);

export const selectNewTab = (page: Page): Locator =>
  selectHeader(page).getByRole('tab').nth(1);

export const selectPreviousButton = (page: Page): Locator =>
  page.getByRole('button').filter({ hasText: 'Prev' });

export const selectNextButton = (page: Page): Locator =>
  page.getByRole('button').filter({ hasText: 'Next' });

export const selectMainContent = (page: Page): Locator =>
  page.getByRole('main');

export const selectFooter = (page: Page): Locator =>
  page.getByRole('contentinfo');

export const selectToggleThemeButton = (page: Page): Locator =>
  selectHeader(page).getByRole('switch');

export const selectRefreshButton = (page: Page): Locator =>
  selectHeader(page).getByRole('button', { name: 'Refresh' });

export const selectStoryCards = (page: Page): Locator =>
  page.getByRole('article');

export const selectStoryCardByIndex = (page: Page, index: number): Locator =>
  selectStoryCards(page).nth(index);

export const selectStoryCardFooter = (storyCard: Locator): Locator =>
  storyCard.locator('footer');

export const selectStoryCardHeading = (storyCard: Locator): Locator =>
  storyCard.getByRole('heading');

export const selectPageSize = (page: Page): Locator =>
  page.getByRole('combobox', { name: 'Items per page' });

export const selectPageInfo = (page: Page): Locator =>
  page.locator('div:has-text("Page")');

export const selectCurrentPage = (page: Page): Locator =>
  selectPageInfo(page).locator('strong').nth(0);

export const selectTotalPages = (page: Page): Locator =>
  selectPageInfo(page).locator('strong').nth(1);
