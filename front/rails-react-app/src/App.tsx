import { FC, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, HeaderAndSiderRoute } from 'utils/route';
import User from 'Routes/user';
import Team from 'Routes/team';
import AuthUserProvider from 'auth/AuthUserContext';
import * as Pages from 'pages';
import { colors } from 'app_design';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif;
    background-color: ${colors.BG};
    overflow-x: hidden;
  }
`;

export const App: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isSmall, setIsSmall] = useState<boolean>(window.innerWidth <= 480);
  useEffect(() => {
    setIsSmall(window.innerWidth <= 480);
    const onResize = () => {
      setIsSmall(window.innerWidth <= 480);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <>
      <AuthUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pages.TopPage isSmall={isSmall} />} />
            <Route path="/signup" element={<Pages.Signup />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="user" element={<PrivateRoute />}>
              <Route path="team/:teamId">
                <Route
                  path="*"
                  element={
                    <HeaderAndSiderRoute
                      setIsCollapsed={setIsCollapsed}
                      isSmall={isSmall}
                      isCollapsed={isCollapsed}
                      hasSider={false}
                    />
                  }
                >
                  <Route path="*" element={<Team isSmall={isSmall} />} />
                </Route>
              </Route>
              <Route
                path="*"
                element={
                  <HeaderAndSiderRoute
                    setIsCollapsed={setIsCollapsed}
                    isCollapsed={isCollapsed}
                    isSmall={isSmall}
                    hasSider={true}
                  />
                }
              >
                <Route path="*" element={<User />} />
              </Route>
            </Route>

            <Route path="*" element={<Pages.Login />} />
          </Routes>
        </BrowserRouter>
        <GlobalStyles />
      </AuthUserProvider>
    </>
  );
};
