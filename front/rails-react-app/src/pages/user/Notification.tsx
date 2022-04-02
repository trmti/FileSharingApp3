import { VFC } from 'react';
import { Link } from 'react-router-dom';

const Home: VFC = () => {
  return (
    <>
      <Link to="/user">ホーム画面</Link>
      <Link to="/signup">新規登録</Link>
      <Link to="/login">ログイン</Link>
      <Link to="/logout">ログアウト</Link>
    </>
  );
};

export default Home;
