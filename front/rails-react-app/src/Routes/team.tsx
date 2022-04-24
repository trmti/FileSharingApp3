import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Pages from 'pages';

type Props = {
  isSmall: boolean;
};

const Team: FC<Props> = ({ isSmall }) => {
  return (
    <Routes>
      <Route path="/home" element={<Pages.TeamHome />} />
      <Route path="folder/:folderId" element={<Pages.TeamFolder />} />
      <Route
        path="folder/:folderId/chat/:fileId"
        element={<Pages.Chat isSmall={isSmall} />}
      />
    </Routes>
  );
};

export default Team;
