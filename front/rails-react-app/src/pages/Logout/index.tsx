import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useLogout } from 'auth/AuthUserContext';
import LogoutTemp from 'components/templates/Logout';

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
  return <LogoutTemp onClick={onClick} />;
};

export default Logout;
