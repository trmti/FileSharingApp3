import { FC } from 'react';
import { Typography, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import JoinTeam from 'components/organisms/JoinTeam';
import RecentlyTeam from 'components/organisms/RecentlyTeam';
import { TeamWithImage } from 'type';
import { colors } from 'app_design';

type Props = {
  joinTeams: TeamWithImage[] | null;
  recentlyTeams: TeamWithImage[] | null;
  loadingJoinTeams: boolean;
  loadingRecentTeams: boolean;
  onClickJoinTeams: (id: number) => void;
  onClickRecentlyTeams: (id: number) => void;
};

const Home: FC<Props> = ({
  joinTeams,
  recentlyTeams,
  loadingJoinTeams,
  loadingRecentTeams,
  onClickJoinTeams,
  onClickRecentlyTeams,
}) => {
  return (
    <>
      <Typography.Title>所属チーム</Typography.Title>
      {loadingJoinTeams ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
      ) : (
        <JoinTeam joinTeams={joinTeams} onClick={onClickJoinTeams} />
      )}
      <Divider
        style={{
          marginTop: 50,
          marginBottom: 50,
          borderTop: `3px solid ${colors.Border}`,
        }}
      />
      <Typography.Title>最近追加されたチーム</Typography.Title>
      {loadingRecentTeams ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
      ) : (
        <RecentlyTeam
          recentlyTeams={recentlyTeams}
          onClick={onClickRecentlyTeams}
        />
      )}
    </>
  );
};

export default Home;
