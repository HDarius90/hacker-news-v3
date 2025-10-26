import type { HnItem } from '../lib/hn/types';
import { getDomain } from '../utils/getDomain';

const StoryCard = ({ item }: { item: HnItem }) => {
  const domain = getDomain(item.url);

  return (
    <article
      className='h-full flex flex-col justify-between rounded-2xl border p-4 hover:hover-card bg-gray-200 dark:bg-white'
      role='article'
      aria-labelledby={`item-title-${item.id}`}
    >
      <header>
        <h2
          id={`item-title-${item.id}`}
          className='text-lg font-semibold leading-snug line-clamp-2'
          role='heading'
        >
          <a
            href={item.url ?? `https://news.ycombinator.com/item?id=${item.id}`}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            {item.title}
          </a>
        </h2>
      </header>

      <p className='mt-1 text-sm text-gray-500'>{domain}</p>

      <footer className='mt-3 flex items-center justify-between text-xs text-gray-500'>
        <span>
          {item.score ?? 0} points • by {item.by ?? 'unknown'}
        </span>
        <a
          href={`https://news.ycombinator.com/item?id=${item.id}`}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
          aria-label='View comments on Hacker News'
        >
          {item.descendants ?? 0} comments
        </a>
      </footer>
    </article>
  );
};

export default StoryCard;
