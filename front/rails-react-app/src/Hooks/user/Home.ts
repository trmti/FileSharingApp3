import { useState, useEffect } from 'react';
import { getTeamsByUserId, getTeamsRecord } from 'db/team';
import { TeamWithImage, User } from 'type';

type Props = {
  joinTeams: TeamWithImage[] | null;
  recentlyTeams: TeamWithImage[] | null;
  loadingJoinTeams: boolean;
  loadingRecentTeams: boolean;
};

const useHome = (authUser: User | null) => {
  const [state, setState] = useState<Props>({
    joinTeams: null,
    recentlyTeams: null,
    loadingJoinTeams: false,
    loadingRecentTeams: false,
  });

  // ユーザーが参加しているチームの取得
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loadingJoinTeams: true }));
    if (authUser) {
      (async () => {
        const res = await getTeamsByUserId(authUser.id);
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
  }, [authUser]);

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
  return [state] as const;
};

export default useHome;
