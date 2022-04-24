import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Pages from 'pages';

const User: FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Pages.UserHome />} />
      <Route path="/search" element={<Pages.UserSearch />} />
      <Route path="/build" element={<Pages.UserBuild />} />
      <Route path="/profile" element={<Pages.Profile />} />
    </Routes>
  );
};

export default User;
