import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Layout } from 'antd';
import UserDropdown from 'components/molecules/UserDropdown';
import styles from './style.module.css';
import { colors } from 'app_design';
import { getPostByUserId } from 'db/post';
import { useAuthUser, useLogout } from 'auth/AuthUserContext';

const { Header } = Layout;

type Props = {
  small: boolean;
};

const MyHeader: FC<Props> = ({ small }) => {
  const authUser = useAuthUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string>(
    process.env.PUBLIC_URL + '/logo192.png'
  );
  const handleGetImage = async () => {
    if (authUser !== null && authUser.post_id) {
      const userImage = await getPostByUserId(authUser.id);
      if (userImage.status === 'success') {
        setAvatarUrl(userImage.data.image.url);
      }
    }
  };
  const onClickProfile = () => {
    navigate('/user/profile');
  };
  const onClickLogout = async () => {
    await logout();
    navigate('/login');
  };
  useEffect(() => {
    handleGetImage();
  }, [authUser]);
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: small ? '60px' : '80px',
        backgroundColor: colors.Header,
        display: 'flex',
        justifyContent: 'space-between',
        top: 0,
        bottom: 0,
      }}
    >
      <Link to="/user/home">
        <p className={small ? styles.TitleSmall : styles.Title}>Share-Kosen</p>
      </Link>
      <div style={{ display: 'flex' }}>
        <p
          style={{
            color: colors.BG,
            marginRight: 20,
            fontSize: small ? 15 : 24,
          }}
        >
          {authUser ? authUser.name : '未ログイン'}
        </p>
        <UserDropdown
          onClickProfile={onClickProfile}
          onClickLogout={onClickLogout}
        >
          <Avatar
            size={small ? 'small' : 'large'}
            src={avatarUrl}
            style={{ marginTop: small ? '20px' : '15px' }}
          />
        </UserDropdown>
      </div>
    </Header>
  );
};

export default MyHeader;
