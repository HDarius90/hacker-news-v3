import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import FeedPage from './pages/FeedPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/top' replace />} />
          <Route path='top' element={<FeedPage feed='top' />} />
          <Route path='new' element={<FeedPage feed='new' />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
