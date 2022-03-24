import { VFC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout } from 'antd';
import styles from './style.module.css';
import { colors } from 'app_design';
import { getPostByUserId } from 'db/post';
import { useAuthUser } from 'auth/AuthUserContext';

const { Header } = Layout;

const MyHeader: VFC = () => {
  const authUser = useAuthUser();
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
  useEffect(() => {
    handleGetImage();
  }, [authUser]);
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: '80px',
        backgroundColor: colors.Header,
        display: 'flex',
        justifyContent: 'space-between',
        top: 0,
        bottom: 0,
      }}
    >
      <Link to="/">
        <p className={styles.Title}>Share-Kosen</p>
      </Link>
      <Avatar size="large" src={avatarUrl} style={{ marginTop: '15px' }} />
    </Header>
  );
};

export default MyHeader;
