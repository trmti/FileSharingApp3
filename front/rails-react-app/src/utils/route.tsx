import { FC, useEffect } from 'react';
import { RouteProps, Outlet, Navigate } from 'react-router-dom';
import { Layout, Spin, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useUpdateUser, useLoading, useAuthUser } from 'auth/AuthUserContext';
import Header from 'components/organisms/Header';
import Sider from 'components/organisms/Sider';
import { colors } from 'app_design';

const { Content } = Layout;

const siderProps = [
  {
    icon: (
      <Avatar src={process.env.PUBLIC_URL + '/icon/Home.png'} size="small" />
    ),
    text: 'ホーム',
    to: '/user/home',
  },
  {
    icon: (
      <Avatar src={process.env.PUBLIC_URL + '/icon/Search.png'} size="small" />
    ),
    text: '探す',
    to: '/user/search',
  },
  {
    icon: (
      <Avatar src={process.env.PUBLIC_URL + '/icon/Build.png'} size="small" />
    ),
    text: '作る',
    to: '/user/build',
  },
];

type NewRouteProps = {
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  isSmall: boolean;
  hasSider: boolean;
};

export const HeaderAndSiderRoute: FC<RouteProps & NewRouteProps> = ({
  setIsCollapsed,
  isCollapsed,
  isSmall,
  hasSider = true,
}) => {
  return (
    <>
      {hasSider ? (
        <Sider
          props={siderProps}
          setIsCollapsed={setIsCollapsed}
          small={isSmall}
          isCollapsed={isCollapsed}
        />
      ) : (
        <></>
      )}
      <Header small={isSmall} />
      <Content
        style={{
          paddingTop: '110px',
          paddingLeft: isCollapsed || !hasSider ? 50 : 300,
          backgroundColor: colors.BG,
        }}
      >
        <Outlet />
      </Content>
    </>
  );
};

export const PrivateRoute: FC<RouteProps> = ({}) => {
  const updateUser = useUpdateUser();
  const loading = useLoading();
  const user = useAuthUser();
  useEffect(() => {
    (async () => {
      await updateUser();
    })();
  }, []);
  if (!loading) {
    return user !== null ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 400 }} />}
        style={{ width: '100%' }}
      />
    );
  }
};
