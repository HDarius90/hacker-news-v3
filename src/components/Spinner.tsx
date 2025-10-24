import ClipLoader from 'react-spinners/ClipLoader';

type SpinnerProps = {
  size?: number;
  className?: string;
  ariaLabel?: string;
};

const cssOverride = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({
  size = 150,
  className = '',
  ariaLabel = 'Loading Spinner',
}: SpinnerProps) => {
  return (
    <ClipLoader
      className={className}
      color='#ff6600'
      cssOverride={cssOverride}
      size={size}
      aria-label={ariaLabel}
    />
  );
};

export default Spinner;
