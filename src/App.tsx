import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';

const Layout = lazy(() => import('./layout/Layout'));
const FeedPage = lazy(() => import('./pages/FeedPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/top' replace />} />
            <Route path='top' element={<FeedPage feed='top' />} />
            <Route path='new' element={<FeedPage feed='new' />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
