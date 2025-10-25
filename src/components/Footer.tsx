const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 w-full bg-secondary text-gray-300 text-center py-3 shadow-inner dark:bg-gray-300'>
      <p className='text-sm dark:text-gray-800'>
        © {new Date().getFullYear()} Hacker News V3.0 — Built by Darius Hadjati
        using React + TypeScript
      </p>
    </footer>
  );
};

export default Footer;
