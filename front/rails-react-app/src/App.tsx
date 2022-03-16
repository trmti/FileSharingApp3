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
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import Logout from 'pages/Logout';
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
    (async () => {
      await updateUser();
    })();
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
          <Header>
            <AppHeader />
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="/user" element={<PrivateRoute />}>
                <Route path="/user" element={<Home />} />
              </Route>
            </Routes>
          </Content>
        </BrowserRouter>
        <GlobalStyles />
      </AuthUserProvider>
    </>
  );
};
