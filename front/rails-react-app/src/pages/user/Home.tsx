import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';
import { getTeamsRecord } from 'db/team';
import { getTeamsByUserId } from 'db/user';
import { TeamWithImage } from 'type';
import HomeTemp from 'components/templates/Home';

const Home: FC = () => {
  const navigate = useNavigate();
  const [recentlyTeams, setrecentlyTeams] =
    useState<TeamWithImage[] | null>(null);
  const [loadingJoinTeams, setLoadingJoinTeams] = useState<boolean>(false);
  const [loadingRecentTeams, setLoadingRecentTeams] = useState<boolean>(false);
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
    setLoadingJoinTeams(true);
    if (user) {
      (async () => {
        const res = await getTeamsByUserId(user.id);
        if (res.status === 'success') {
          setJoinTeams(res.data);
        }
        setLoadingJoinTeams(false);
      })();
    }
    return;
  }, [user]);

  // 最近追加されたチームの取得
  useEffect(() => {
    setLoadingRecentTeams(true);
    (async () => {
      const res = await getTeamsRecord(10, 0);
      if (res.status === 'success') {
        setrecentlyTeams(res.data);
      }
      setLoadingRecentTeams(false);
    })();
  }, []);

  return (
    <HomeTemp
      joinTeams={joinTeams}
      recentlyTeams={recentlyTeams}
      loadingJoinTeams={loadingJoinTeams}
      loadingRecentTeams={loadingRecentTeams}
      onClickJoinTeams={onClickJoinTeams}
      onClickRecentlyTeams={onClickRecentlyTeams}
    />
  );
};

export default Home;
