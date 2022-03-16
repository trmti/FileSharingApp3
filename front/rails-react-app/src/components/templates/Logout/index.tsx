import { VFC } from 'react';

type Props = {
  onClick: () => void;
};

const Logout: VFC<Props> = ({ onClick }) => {
  return <button onClick={onClick}>ログアウト</button>;
};

export default Logout;
