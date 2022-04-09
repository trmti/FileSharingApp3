import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';
import { getTeamsRecord } from 'db/team';
import { getTeamsByUserId } from 'db/user';
import { TeamWithImage } from 'type';
import HomeTemp from 'components/templates/Home';

type stateProps = {
  recentlyTeams: TeamWithImage[] | null;
  joinTeams: TeamWithImage[] | null;
  loadingRecentTeams: boolean;
  loadingJoinTeams: boolean;
};

const Home: FC = () => {
  const [state, setState] = useState<stateProps>({
    recentlyTeams: null,
    joinTeams: null,
    loadingRecentTeams: false,
    loadingJoinTeams: false,
  });
  const navigate = useNavigate();
  const user = useAuthUser();

  const onClickJoinTeams = (id: number) => {
    navigate(`../team/${id}`);
  };

  const onClickRecentlyTeams = (id: number) => {
    navigate(`../team/${id}`);
  };

  // ユーザーが参加しているチームの取得
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loadingJoinTeams: true }));
    if (user) {
      (async () => {
        const res = await getTeamsByUserId(user.id);
        if (res.status === 'success') {
          setState((prevState) => ({
            ...prevState,
            joinTeams: res.data,
          }));
        }
        setState((prevState) => ({ ...prevState, loadingJoinTeams: false }));
      })();
    }
    return;
  }, [user]);

  // 最近追加されたチームの取得
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loadingRecentTeams: true }));
    (async () => {
      const res = await getTeamsRecord(10, 0);
      if (res.status === 'success') {
        setState((prevState) => ({ ...prevState, recentlyTeams: res.data }));
      }
      setState((prevState) => ({ ...prevState, loadingRecentTeams: false }));
    })();
  }, []);

  return (
    <HomeTemp
      {...state}
      onClickJoinTeams={onClickJoinTeams}
      onClickRecentlyTeams={onClickRecentlyTeams}
    />
  );
};

export default Home;
