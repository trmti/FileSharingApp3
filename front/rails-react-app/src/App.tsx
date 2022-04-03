import { VFC, FC, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
  Route,
  RouteProps,
} from 'react-router-dom';
import { Layout, Avatar } from 'antd';
import AuthUserProvider, {
  useLoading,
  useAuthUser,
  useUpdateUser,
} from 'auth/AuthUserContext';
import Header from 'components/organisms/Header';
import Sider from 'components/organisms/Sider';
import * as Pages from 'pages';
import { colors } from 'app_design';

const { Content } = Layout;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif;
    background-color: ${colors.BG};
  }
`;

const siderProps = [
  {
    icon: (
      <Avatar src={process.env.PUBLIC_URL + '/icon/Home.png'} size="small" />
    ),
    text: 'ホーム',
    to: '/user',
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
  {
    icon: (
      <Avatar
        src={process.env.PUBLIC_URL + '/icon/Notification.png'}
        size="small"
      />
    ),
    text: 'お知らせ',
    to: '/user/Notification',
  },
];

const PrivateRoute: FC<RouteProps> = () => {
  const updateUser = useUpdateUser();
  const loading = useLoading();
  const user = useAuthUser();
  useEffect(() => {
    updateUser();
  }, []);
  if (!loading) {
    return user !== null ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export const App: VFC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isSmall, setIsSmall] = useState<boolean>(window.innerWidth < 480);
  useEffect(() => {
    const onResize = () => {
      setIsSmall(window.innerWidth < 480);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <>
      <AuthUserProvider>
        <BrowserRouter>
          <Sider
            props={siderProps}
            setIsCollapsed={setIsCollapsed}
            small={isSmall}
            isCollapsed={isCollapsed}
          />
          <Header small={isSmall} />
          {!isCollapsed && window.innerWidth < 480 ? (
            <></>
          ) : (
            <Content
              style={{
                marginTop: '110px',
                marginLeft: isCollapsed ? 50 : 300,
                backgroundColor: colors.BG,
              }}
            >
              <Routes>
                <Route path="/" element={<Pages.UserNotification />} />
                <Route path="/signup" element={<Pages.Signup />} />
                <Route path="/login" element={<Pages.Login />} />
                <Route path="/logout" element={<Pages.Logout />} />

                <Route path="/user" element={<PrivateRoute />}>
                  <Route path="/user" element={<Pages.UserHome />} />
                  <Route path="/user/search" element={<Pages.UserSearch />} />
                  <Route path="/user/build" element={<Pages.UserBuild />} />
                  <Route
                    path="/user/Notification"
                    element={<Pages.UserNotification />}
                  />

                  <Route
                    path="/user/team/:teamId"
                    element={<Pages.TeamHome />}
                  />
                  <Route
                    path="/user/team/:teamId/folder/:folderId"
                    element={<Pages.TeamFolder />}
                  />

                  <Route path="*" element={<Pages.Login />} />
                </Route>
              </Routes>
            </Content>
          )}
        </BrowserRouter>
        <GlobalStyles />
      </AuthUserProvider>
    </>
  );
};
