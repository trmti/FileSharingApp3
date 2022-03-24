import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';
import { getTeamsRecord } from 'db/team';
import { getTeamsByUserId } from 'db/user';
import { TeamWithImage } from 'type';
import { createTeamCard } from 'utils/user';
import HomeTemp from 'components/templates/Home';

const Home: FC = () => {
  const navigate = useNavigate();
  const [recentlyTeams, setrecentlyTeams] =
    useState<TeamWithImage[] | null>(null);
  const user = useAuthUser();
  const [joinTeams, setJoinTeams] = useState<TeamWithImage[] | null>(null);

  const onClickJoinTeams = (id: number) => {
    navigate(`../team/${id}`);
  };

  const onClickRecentlyTeams = (id: number) => {
    navigate(`../team/${id}`);
  };

  // ユーザーが参加しているチームの取得
  useEffect(() => {
    if (user) {
      (async () => {
        const res = await getTeamsByUserId(user.id);
        if (res.status === 'success') {
          const teams: TeamWithImage[] = await createTeamCard(res);
          setJoinTeams(teams);
        }
      })();
    }
    return;
  }, []);

  // 最近追加されたチームの取得
  useEffect(() => {
    (async () => {
      const res = await getTeamsRecord(10, 0);
      if (res.status === 'success') {
        const teams: TeamWithImage[] = await createTeamCard(res);
        setrecentlyTeams(teams);
      }
    })();
  }, []);

  return (
    <HomeTemp
      joinTeams={joinTeams}
      recentlyTeams={recentlyTeams}
      onClickJoinTeams={onClickJoinTeams}
      onClickRecentlyTeams={onClickRecentlyTeams}
    />
  );
};

export default Home;
