import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useLogout } from 'auth/AuthUserContext';

const Logout: VFC = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const onClick = () => {
    try {
      logout();
      navigate('/login');
    } catch (err) {
      message.error(
        'ログアウトに失敗しました。時間をおいて再度お試しください。'
      );
    }
  };
  return <button onClick={onClick}>ログアウト</button>;
};

export default Logout;
