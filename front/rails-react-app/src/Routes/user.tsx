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

      <Route path="/team/:teamId" element={<Pages.TeamHome />} />
      <Route
        path="/team/:teamId/folder/:folderId"
        element={<Pages.TeamFolder />}
      />
    </Routes>
  );
};

export default User;
