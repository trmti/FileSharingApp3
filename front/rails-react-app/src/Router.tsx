import { Route, ReactLocation } from 'react-location';
import Home from 'pages/Home';
import Signup from 'pages/Signup';

export const location = new ReactLocation();
export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
];
