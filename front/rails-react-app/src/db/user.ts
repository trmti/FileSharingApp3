import { getAction } from './utils';
import { User, TeamWithImage } from 'type';

export const getUserByUserId = (userId: number) => {
  const res = getAction<User>(
    `/user/${userId}`,
    'ユーザーの取得に失敗しました'
  );
  return res;
};

export const getTeamsByUserId = (userId: number) => {
  const res = getAction<TeamWithImage[]>(
    `user/get_join_teams/${userId}`,
    'チームの取得に失敗しました'
  );
  return res;
};
