import { BiRefresh } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const location = useLocation();

  return (
    <>
      <header className='px-6 sticky top-0 z-30 backdrop-blur border-b bg-primary'>
        <div className='justify-between px-4 py-3 flex items-center gap-4'>
          <img
            src='/y18.svg'
            alt='Hacker News V3'
            width={32}
            height={32}
            className='w-8 h-8 border-2 border-white'
          />

          <h1 className='font-heading text-xl font-bold tracking-tight'>
            Hacker News V3
          </h1>

          <nav className='ml-2 flex items-center gap-1' aria-label='Feed'>
            <Link
              to='/top'
              aria-current={location.pathname === '/top' ? 'page' : undefined}
              className='m-2 py-1.5 text-sm  border-b-2 border-transparent hover-lift'
            >
              Top
            </Link>
            <Link
              to='/new'
              aria-current={location.pathname === '/new' ? 'page' : undefined}
              className='m-2 py-1.5 text-sm border-b-2 border-transparent hover-lift'
            >
              New
            </Link>
          </nav>

          <div className='ml-auto flex items-center gap-2'>
            <button
              type='button'
              onClick={() => window.location.reload()}
              aria-label='Refresh'
              title='Refresh'
              className='flex justify-center items-center p-1 hover-lift rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
            >
              <BiRefresh className='text-2xl' />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
