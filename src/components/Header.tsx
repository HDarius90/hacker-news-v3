import { BiRefresh } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className='px-6 sticky top-0 z-30 backdrop-blur border-b bg-primary'>
        <div className='justify-between px-4 py-3 flex items-center gap-4'>
          {/* Title */}
          <h1 className='font-heading text-xl font-bold tracking-tight'>
            Hacker News V3
          </h1>

          {/* Feed switcher */}
          <nav
            className='ml-2 flex items-center gap-1'
            role='tablist'
            aria-label='Feed'
          >
            <Link
              to='/top'
              className='m-2 py-1.5 text-sm  border-b-2 border-transparent hover-lift'
            >
              Top
            </Link>
            <Link
              to='/new'
              className='m-2 py-1.5 text-sm border-b-2 border-transparent hover-lift'
            >
              New
            </Link>
          </nav>

          {/* Toolbar */}
          <div className='ml-auto flex items-center gap-2'>
            <div className='flex justify-center hover-lift'>
              <BiRefresh className='text-3xl' />
            </div>
            {/* Placeholder for theme toggle later */}
            <div className='h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full' />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
