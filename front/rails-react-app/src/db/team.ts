import axios, { AxiosInstance, AxiosResponse, AxiosPromise } from 'axios';
import { TeamApiJson, Team, FetchFailed, FetchSuccess } from 'type';

type FetchTeamSuccess = FetchSuccess<Team>;
type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;

let client: AxiosInstance;

client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = response.data;
  return { ...response.data, data };
});

export const getTeamsRecord = (
  limit: number,
  offset: number
): Promise<FetchTeamApiJsonSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_teams_record/${limit}/${offset}`)
    .then((prop: AxiosResponse<TeamApiJson>): FetchTeamApiJsonSuccess => {
      const teams = prop.data.teams;
      return { status: 'success', data: { teams } };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました。' };
    });

  return res;
};
