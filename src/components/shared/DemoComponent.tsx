import { registerElements } from 'genesys-spark-components';
import { GuxButton } from 'genesys-spark-components-react';
import { useState } from 'react';
registerElements(); // Realistically this would probably be in something like index.tsx

const DemoComponent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <GuxButton onClick={() => setCounter(x => x + 1)}>
      You have clicked {counter} times
    </GuxButton>
  );
};

export default DemoComponent;