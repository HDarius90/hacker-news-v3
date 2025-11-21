import { useIsFetching, useQueries, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Spinner from '../components/Spinner';
import StoryCard from '../components/StoryCard';
import { fetchFeedIds, fetchPost } from '../lib/hn/api';
import { DEFAULT_PAGE_SIZE } from '../lib/hn/constants';
import type { Feed } from '../lib/hn/types';
import { queryKeys } from '../react-query/constants';

const FeedPage = ({ feed }: { feed: Feed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const isFetching = useIsFetching();

  const { data: ids = [] } = useQuery<number[]>({
    queryKey: [queryKeys.feedIds, feed],
    queryFn: () => fetchFeedIds(feed),
  });

  const maxPostPage = ids ? Math.ceil(ids.length / pageSize) : 1;

  const postIds = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return ids.slice(start, end);
  }, [ids, pageSize, currentPage]);

  const posts = useQueries({
    queries: postIds.map((id) => ({
      queryKey: [queryKeys.posts, id],
      queryFn: () => fetchPost(id),
    })),
    combine: (results) => results.map((item) => item.data),
  });

  const canPrev = currentPage > 1;
  const canNext = currentPage < maxPostPage;

  const goPrev = () =>
    !isFetching && canPrev && setCurrentPage(currentPage - 1);
  const goNext = () =>
    !isFetching && canNext && setCurrentPage(currentPage + 1);

  return (
    <>
      <div className='w-full'>
        <div className='mb-4 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='text-sm text-gray-600 dark:text-white'>
              Page <strong>{currentPage}</strong> of{' '}
              <strong>{maxPostPage}</strong>
            </div>

            <label className='text-sm text-gray-600'>
              <span className='sr-only'>Items per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const next = Number(e.target.value) || DEFAULT_PAGE_SIZE;
                  setPageSize(next);
                  setCurrentPage(1);
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
              disabled={!!isFetching || !canPrev}
              className={`px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 dark:bg-gray-200 ${
                canPrev ? 'hover:bg-gray-200 dark:hover:bg-gray-500' : ''
              }`}
            >
              Prev
            </button>
            <button
              onClick={goNext}
              disabled={!!isFetching || !canNext}
              className={`px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 dark:bg-gray-200 ${
                canNext ? 'hover:bg-gray-200 dark:hover:bg-gray-500' : ''
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {posts.map(
              (post) => post && <StoryCard key={post.id} item={post} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;
