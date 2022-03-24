import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import TeamHeader from 'components/organisms/TeamHeader';
import Folders from 'components/organisms/Folders';
import BackButton from 'components/molecules/BackButton';
import { TeamDescription, Folder } from 'type';
import { colors } from 'app_design';

type Props = {
  team: TeamDescription | null;
  folders: Folder[] | null;
  onClickCard: (id: number) => void;
};

const Home: FC<Props> = ({ team, folders, onClickCard }) => {
  const navigate = useNavigate();
  return (
    <>
      <BackButton
        onClick={() => {
          navigate('..');
        }}
        style={{ marginBottom: 30 }}
      />
      <TeamHeader team={team} />
      <Divider style={{ borderTop: `3px solid ${colors.Border}` }} />
      <Folders folders={folders} onClick={onClickCard} />
    </>
  );
};

export default Home;
