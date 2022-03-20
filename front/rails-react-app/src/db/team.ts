import { AxiosResponse } from 'axios';
import { createFormData } from 'utils';
import { client, fileClient } from './client';
import {
  TeamApiJson,
  Team,
  Post,
  FetchFailed,
  FetchSuccess,
  BuildTeamParams,
} from 'type';

type FetchPostSuccess = FetchSuccess<Post>;
type FetchTeamSuccess = FetchSuccess<Team>;
type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;

const createPost = (
  id: number,
  image: FormData
): Promise<FetchPostSuccess | FetchFailed> => {
  const res = fileClient
    .post(`/teams/create_image/${id}`, image)
    .then((prop: AxiosResponse<Post>): FetchPostSuccess => {
      console.log(prop);
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
        const res = createPost(id, image);
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

// export const createPost = async (image: any) => {
//   const formData = new FormData();
//   formData.append('image', image);
//   fileClient.post(`/posts`, formData);
// };

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
