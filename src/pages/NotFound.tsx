import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center py-32'>
      <h1 className='text-6xl font-bold text-gray-600 mb-4'>404</h1>
      <p className='text-lg text-gray-600 mb-8'>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to='/'
        className='px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
