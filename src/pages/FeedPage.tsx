import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import type { Feed, HnItem } from '../lib/hn/types';
import { fetchFeedIds, fetchItem } from '../lib/hn/api';

const PAGE_SIZE = 20;

const FeedPage = ({ feed }: { feed: Feed }) => {
  const [page, setPage] = useState(1);
  const [ids, setIds] = useState<number[]>([]);
  const [items, setItems] = useState<(HnItem | null)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIds([]);
    setItems([]);
    setPage(1);

    fetchFeedIds(feed)
      .then(setIds)
      .catch((error) => console.log('Failed to load feed IDs', error))
      .finally(() => setLoading(false));
  }, [feed]);

  useEffect(() => {
    if (!ids.length) return;
    setLoading(true);
    setItems([]);

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageIds = ids.slice(start, end);

    Promise.all(pageIds.map((id) => fetchItem(id)))
      .then(setItems)
      .catch((error) => console.log('Failed to load items', error))
      .finally(() => setLoading(false));
  }, [ids, page]);

  const totalPages = ids.length ? Math.ceil(ids.length / PAGE_SIZE) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => canPrev && setPage(page - 1);
  const goNext = () => canNext && setPage(page + 1);

  return (
    <>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={goPrev}
              disabled={!canPrev}
              className='px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-200 '
            >
              Prev
            </button>
            <button
              onClick={goNext}
              disabled={!canNext}
              className='px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 hover:bg-gray-200'
            >
              Next
            </button>
          </div>
        </div>

        {loading ? (
          <div className='py-40 text-center text-gray-700 text-2xl'>
            Loading...
          </div>
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
