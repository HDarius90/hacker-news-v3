import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import type { Feed, HnItem } from '../lib/hn/types';
import { fetchFeedIds, fetchItem } from '../lib/hn/api';
import { DEFAULT_PAGE_SIZE } from '../lib/hn/constants';
import Spinner from '../components/Spinner';
import { useQuery } from '@tanstack/react-query';

const FeedPage = ({ feed }: { feed: Feed }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<(HnItem | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const { data: ids } = useQuery({
    queryKey: ['items', feed],
    queryFn: () => fetchFeedIds(feed),
  });

  // useEffect(() => {
  //   setLoading(true);
  //   setIds([]);
  //   setItems([]);
  //   setPage(1);

  //   fetchFeedIds(feed)
  //     .then(setIds)
  //     .catch((error) => console.log('Failed to load feed IDs', error))
  //     .finally(() => setLoading(false));
  // }, [feed]);

  useEffect(() => {
    if (!ids) return;
    setLoading(true);
    setItems([]);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageIds = ids.slice(start, end);

    Promise.allSettled(pageIds.map((id) => fetchItem(id)))
      .then((results) => {
        const items = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setItems(items);
      })
      .catch((error) => console.log('Failed to load items', error))
      .finally(() => setLoading(false));
  }, [ids, page, pageSize]);

  const totalPages = ids ? Math.ceil(ids.length / pageSize) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => !loading && canPrev && setPage(page - 1);
  const goNext = () => !loading && canNext && setPage(page + 1);

  return (
    <>
      <div className='w-full'>
        <div className='mb-4 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='text-sm text-gray-600 dark:text-white'>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </div>

            <label className='text-sm text-gray-600'>
              <span className='sr-only'>Items per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const next = Number(e.target.value) || DEFAULT_PAGE_SIZE;
                  setPageSize(next);
                  setPage(1);
                }}
                className='ml-2 px-2 py-1 border rounded bg-gray-100 dark:bg-white text-sm'
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={goPrev}
              disabled={loading || !canPrev}
              className={`px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 dark:bg-gray-200 ${
                canPrev ? 'hover:bg-gray-200 dark:hover:bg-gray-500' : ''
              }`}
            >
              Prev
            </button>
            <button
              onClick={goNext}
              disabled={loading || !canNext}
              className={`px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 dark:bg-gray-200 ${
                canNext ? 'hover:bg-gray-200 dark:hover:bg-gray-500' : ''
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {items.map(
              (item) => item && <StoryCard key={item.id} item={item} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;
