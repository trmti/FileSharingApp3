import { AxiosResponse } from 'axios';
import { createFormData } from 'utils';
import { client, fileClient } from './client';
import {
  TeamApiJson,
  Team,
  Post,
  User,
  FetchFailed,
  FetchSuccess,
  BuildTeamParams,
} from 'type';

type FetchPostSuccess = FetchSuccess<Post>;
type FetchTeamSuccess = FetchSuccess<Team>;
type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;
type FetchUsersSuccess = FetchSuccess<User[]>;

export const getTeamById = (
  teamId: number
): Promise<FetchTeamSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/${teamId}`)
    .then((prop: AxiosResponse<Team>): FetchTeamSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームが見つかりませんでした' };
    });

  return res;
};

const createImage = (
  id: number,
  image: FormData
): Promise<FetchPostSuccess | FetchFailed> => {
  const res = fileClient
    .post(`/teams/create_image/${id}`, image)
    .then((prop: AxiosResponse<Post>): FetchPostSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'イメージが作れませんでした' };
    });
  return res;
};

export const createTeam = (
  params: BuildTeamParams,
  leader_id: number
): Promise<FetchTeamSuccess | FetchFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post(`/user/create_team/${leader_id}`, { ...otherParams })
    .then((prop: AxiosResponse<Team>) => {
      const team = prop.data;
      return { id: team.id, file, team };
    })
    .then(({ id, file, team }): FetchTeamSuccess | FetchFailed => {
      if (file) {
        const image = createFormData('image', file);
        createImage(id, image);
        return { status: 'success', data: team };
      } else {
        return { status: 'error', message: 'ファイルが選択されていません' };
      }
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました' };
    });
  return res;
};

export const getUsers = (
  teamId: number
): Promise<FetchUsersSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_users/${teamId}`)
    .then((prop: AxiosResponse<User[]>): FetchUsersSuccess => {
      const users = prop.data;
      return { status: 'success', data: users };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ユーザー一覧の取得に失敗しました' };
    });
  return res;
};

export const getEditors = (
  teamId: number
): Promise<FetchUsersSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_editors/${teamId}`)
    .then((prop: AxiosResponse<User[]>): FetchUsersSuccess => {
      const editors = prop.data;
      return { status: 'success', data: editors };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ユーザー一覧の取得に失敗しました' };
    });
  return res;
};

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

export const searchTeams = (
  text: string,
  limit: number
): Promise<FetchTeamApiJsonSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/search_teams/${text}/${limit}`)
    .then((prop: AxiosResponse<TeamApiJson>): FetchTeamApiJsonSuccess => {
      const teams = prop.data.teams;
      return { status: 'success', data: { teams } };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました' };
    });
  return res;
};
