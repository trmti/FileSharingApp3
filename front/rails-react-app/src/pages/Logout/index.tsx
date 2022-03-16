import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from 'auth/AuthUserContext';
import LogoutTemp from 'components/templates/Logout';

const Logout: VFC = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate('/login');
  };
  return <LogoutTemp onClick={onClick} />;
};

export default Logout;
