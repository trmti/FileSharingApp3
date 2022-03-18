import { FC } from 'react';
import { Typography, Divider } from 'antd';
import JoinTeam from 'components/organisms/JoinTeam';
import RecentlyTeam from 'components/organisms/RecentlyTeam';
import { TeamWithImage } from 'type';
import { colors } from 'app_design';

type Props = {
  joinTeams: TeamWithImage[] | null;
  recentlyTeams: TeamWithImage[] | null;
  onClickJoinTeams: (id: number) => void;
  onClickRecentlyTeams: (id: number) => void;
};

const Home: FC<Props> = ({
  joinTeams,
  recentlyTeams,
  onClickJoinTeams,
  onClickRecentlyTeams,
}) => {
  return (
    <>
      <Typography.Title>所属チーム</Typography.Title>
      <JoinTeam joinTeams={joinTeams} onClick={onClickJoinTeams} />
      <Divider
        style={{
          marginTop: 50,
          marginBottom: 50,
          borderTop: `3px solid ${colors.Border}`,
        }}
      />
      <Typography.Title>最近追加されたチーム</Typography.Title>
      <RecentlyTeam
        recentlyTeams={recentlyTeams}
        onClick={onClickRecentlyTeams}
      />
    </>
  );
};

export default Home;
