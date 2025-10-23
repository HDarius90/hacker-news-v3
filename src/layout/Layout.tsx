import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div>
      <Header />

      <main className='max-w-6xl mx-auto px-4 py-6'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
