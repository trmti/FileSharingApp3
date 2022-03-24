import { AxiosResponse } from 'axios';
import { client } from './client';
import { User, TeamApiJson, FetchSuccess, FetchFailed } from 'type';

type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;
type FetchUserSuccess = FetchSuccess<User>;

export const getUserByUserId = (userId: number) => {
  const res = client
    .get(`/user/${userId}`)
    .then((prop: AxiosResponse<User>): FetchUserSuccess => {
      const data = prop.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ユーザーの取得に失敗しました' };
    });
  return res;
};

export const getTeamsByUserId = (userId: number) => {
  const res = client
    .get(`/user/get_join_teams/${userId}`)
    .then((prop: AxiosResponse<TeamApiJson>): FetchTeamApiJsonSuccess => {
      const data = prop.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました' };
    });
  return res;
};
