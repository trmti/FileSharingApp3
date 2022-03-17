import { VFC, FC, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
  Route,
  RouteProps,
} from 'react-router-dom';
import { Layout } from 'antd';
import AuthUserProvider, {
  useLoading,
  useAuthUser,
  useUpdateUser,
} from 'auth/AuthUserContext';
import AppHeader from 'components/organisms/Header';
import * as Pages from 'pages';
import { colors } from 'app_design';

const { Header, Content } = Layout;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif;
    background-color: ${colors.BG};
  }
`;

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
  return (
    <>
      <AuthUserProvider>
        <BrowserRouter>
          <AppHeader />
          <Content style={{ marginTop: '80px' }}>
            <Routes>
              <Route path="/" element={<Pages.Home />} />
              <Route path="/signup" element={<Pages.Signup />} />
              <Route path="/login" element={<Pages.Login />} />
              <Route path="/logout" element={<Pages.Logout />} />

              <Route path="/user" element={<PrivateRoute />}>
                <Route path="/user" element={<Pages.Home />} />
                <Route path="/user/search" element={<Pages.Search />} />
                <Route path="/user/build" element={<Pages.Build />} />
                <Route
                  path="/user/Notification"
                  element={<Pages.Notification />}
                />
              </Route>
            </Routes>
          </Content>
        </BrowserRouter>
        <GlobalStyles />
      </AuthUserProvider>
    </>
  );
};
