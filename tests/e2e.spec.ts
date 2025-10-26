import { test, expect } from '@playwright/test';
import {
  Flow,
  mockFeedApi,
  MockHnItem,
  MockHnItemIdsNew,
  MockHnItemIdsTop,
  mockItemApi,
} from './mockApi';
import { getDomain } from '../src/utils/getDomain';
import {
  selectSpinner,
  selectHeader,
  selectTopTab,
  selectMainContent,
  selectFooter,
  selectStoryCards,
  selectStoryCardByIndex,
  selectRefreshButton,
  selectStoryCardHeading,
  selectStoryCardFooter,
  selectToggleThemeButton,
  selectHTML,
  selectNewTab,
  selectPageSize,
  selectCurrentPage,
  selectTotalPages,
  selectPreviousButton,
  selectNextButton,
} from './selectors';

test.describe('Hacker News Feed', () => {
  test.beforeEach(async ({ page }) => {
    await mockFeedApi(page, Flow.TOP);

    await mockItemApi(page);

    await page.goto('/');
  });

  test('should show loading spinner, then load page', async ({ page }) => {
    await expect(selectSpinner(page)).toBeVisible();

    await expect(selectHeader(page)).toBeVisible();

    await expect(selectMainContent(page)).toBeVisible();

    await expect(selectFooter(page)).toBeVisible();

    await expect(selectSpinner(page)).toHaveCount(0);

    await expect(selectTopTab(page)).toHaveAttribute('aria-current', 'page');
  });

  test('should display a grid of stories', async ({ page }) => {
    await expect(selectStoryCards(page)).toHaveCount(MockHnItemIdsTop.length);

    for (let i = 0; i < MockHnItemIdsTop.length; i++) {
      await expect(
        selectStoryCardHeading(selectStoryCardByIndex(page, i))
      ).toContainText(MockHnItem.title);

      await expect(
        selectStoryCardByIndex(page, i).getByText(
          `${getDomain(MockHnItem.url)}`
        )
      ).toBeVisible();

      await expect(
        selectStoryCardFooter(selectStoryCardByIndex(page, i))
      ).toContainText(`${MockHnItem.score} points • by ${MockHnItem.by}`);
    }
  });

  test('should refresh the feed when clicking the refresh button', async ({
    page,
  }) => {
    await selectRefreshButton(page).click();

    await expect(selectSpinner(page)).toBeVisible();

    await expect(selectSpinner(page)).toHaveCount(0);

    await expect(selectStoryCards(page)).toHaveCount(MockHnItemIdsTop.length);
  });

  test('should toggle theme when clicking the theme toggle button', async ({
    page,
  }) => {
    const themeToggleButton = selectToggleThemeButton(page);

    // Initial theme is light
    await expect(selectHTML(page)).not.toHaveClass(/dark/);

    // Click to switch to dark mode
    await themeToggleButton.click();
    await expect(selectHTML(page)).toHaveClass(/dark/);

    // Click to switch back to light mode
    await themeToggleButton.click();
    await expect(selectHTML(page)).not.toHaveClass(/dark/);
  });

  test('should fetch new stories when clicking the New tab', async ({
    page,
  }) => {
    await mockFeedApi(page, Flow.NEW);

    const newTab = selectNewTab(page);

    await newTab.click();

    await expect(selectSpinner(page)).toBeVisible();

    await expect(newTab).toHaveAttribute('aria-current', 'page');

    await expect(selectSpinner(page)).toHaveCount(0);

    await expect(selectStoryCards(page)).toHaveCount(MockHnItemIdsNew.length);
  });

  test('should show multiple page sizes and pagination controls', async ({
    page,
  }) => {
    await expect(selectCurrentPage(page)).toHaveText('1');
    await expect(selectTotalPages(page)).toHaveText('1');

    await expect(selectPreviousButton(page)).toBeDisabled();
    await expect(selectNextButton(page)).toBeDisabled();

    await mockFeedApi(page, Flow.MANY_PAGES);
    await page.goto('/');

    await expect(selectStoryCards(page)).toHaveCount(20);
    await expect(selectCurrentPage(page)).toHaveText('1');
    await expect(selectTotalPages(page)).toHaveText('6');
    await expect(selectPreviousButton(page)).toBeDisabled();
    await expect(selectNextButton(page)).toBeEnabled();

    selectNextButton(page).click();

    await expect(selectCurrentPage(page)).toHaveText('2');
    await expect(selectPreviousButton(page)).toBeEnabled();
    await expect(selectNextButton(page)).toBeEnabled();

    selectPreviousButton(page).click();

    await expect(selectCurrentPage(page)).toHaveText('1');
    await expect(selectPreviousButton(page)).toBeDisabled();
    await expect(selectNextButton(page)).toBeEnabled();

    selectPageSize(page).selectOption('30');

    await expect(selectStoryCards(page)).toHaveCount(30);
    await expect(selectCurrentPage(page)).toHaveText('1');
    await expect(selectTotalPages(page)).toHaveText('4');
    await expect(selectPreviousButton(page)).toBeDisabled();
    await expect(selectNextButton(page)).toBeEnabled();

    selectPageSize(page).selectOption('50');

    await expect(selectStoryCards(page)).toHaveCount(50);
    await expect(selectCurrentPage(page)).toHaveText('1');
    await expect(selectTotalPages(page)).toHaveText('3');
    await expect(selectPreviousButton(page)).toBeDisabled();
    await expect(selectNextButton(page)).toBeEnabled();

    selectNextButton(page).click();
    selectNextButton(page).click();

    await expect(selectCurrentPage(page)).toHaveText('3');
    await expect(selectPreviousButton(page)).toBeEnabled();
    await expect(selectNextButton(page)).toBeDisabled();
    await expect(selectStoryCards(page)).toHaveCount(1);
  });
});
