import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className='dark:bg-gray-900 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-6xl mx-auto mb-10 px-4 py-6 w-full'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
