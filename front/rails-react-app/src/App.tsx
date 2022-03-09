import { VFC } from 'react';
import { Router, Outlet } from 'react-location';
import { routes, location } from './Router';
import { createGlobalStyle } from 'styled-components';
import { Layout } from 'antd';
import AppHeader from 'components/organisms/Header';
import { colors } from 'app_design';

const { Header, Footer, Sider, Content } = Layout;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif;
    background-color: ${colors.BG};
  }
`;

export const App: VFC = () => {
  return (
    <>
      <Router routes={routes} location={location}>
        <Layout style={{ backgroundColor: colors.BG }}>
          <Header>
            <AppHeader />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
        {/* パスが一致した際にレンダリングされるコンポーネント */}
      </Router>
      <GlobalStyles />
    </>
  );
};
