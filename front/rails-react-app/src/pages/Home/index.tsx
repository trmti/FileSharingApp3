import { VFC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';

const Home: VFC = () => {
  const user = useAuthUser();
  console.log(user);
  return (
    <>
      <div>Home</div>
      <Link to="/signup">新規登録</Link>
      <Link to="/login">ログイン</Link>
      <Link to="/logout">ログアウト</Link>
      <div>{user?.id}</div>
    </>
  );
};

export default Home;
