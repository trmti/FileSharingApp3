import { VFC } from 'react';
import { Router, Outlet, Link } from 'react-location';
import { routes, location } from './Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif;
  }
`;

export const App: VFC = () => {
  return (
    <>
      <Router routes={routes} location={location}>
        <Outlet /> {/* パスが一致した際にレンダリングされるコンポーネント */}
      </Router>
      <GlobalStyles />
    </>
  );
};
