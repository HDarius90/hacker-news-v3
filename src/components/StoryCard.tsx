const StoryCard = () => {
  return (
    <article className='h-full flex flex-col justify-between rounded-2xl border p-4 hover:hover-card bg-white'>
      <h2 className='text-lg font-medium leading-snug line-clamp-2'>
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Static post title goes here
        </a>
      </h2>

      <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
        example.com
      </p>

      <div className='mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
        <span>120 points • by alice</span>
        <a href='#' className='hover:underline'>
          42 comments
        </a>
      </div>
    </article>
  );
};

export default StoryCard;
