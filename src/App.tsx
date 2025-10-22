import Footer from './components/Footer';
import Header from './components/Header';
import StoryCard from './components/StoryCard';

function App() {
  return (
    <>
      <Header />
      <main className='flex-1 p-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
