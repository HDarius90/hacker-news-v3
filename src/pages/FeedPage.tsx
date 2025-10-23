import StoryCard from '../components/StoryCard';

const FeedPage = ({ feed }: { feed: string }) => {
  return (
    <>
      <h1>Feed Page: {feed}</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
    </>
  );
};

export default FeedPage;
