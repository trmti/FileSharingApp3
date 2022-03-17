import { VFC } from 'react';
import { useAuthUser } from 'auth/AuthUserContext';

const Home: VFC = () => {
  const user = useAuthUser();
  return <></>;
};

export default Home;
