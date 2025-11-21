import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './react-query/queryClient';

const Layout = lazy(() => import('./layout/Layout'));
const FeedPage = lazy(() => import('./pages/FeedPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}



export default App;
