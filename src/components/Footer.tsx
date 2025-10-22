const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 w-full bg-secondary text-gray-300 text-center py-3 shadow-inner'>
      <p className='text-sm'>
        © {new Date().getFullYear()} Hacker News V3.0 — Built by Darius Hadjati
        using React + TypeScript
      </p>
    </footer>
  );
};

export default Footer;
