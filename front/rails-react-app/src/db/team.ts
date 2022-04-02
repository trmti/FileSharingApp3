import { AxiosResponse } from 'axios';
import { createFormData } from 'utils';
import { client } from './client';
import { createImage } from './post';
import {
  Team,
  TeamWithImage,
  TeamDescription,
  FetchFailed,
  FetchSuccess,
  BuildTeamParams,
} from 'type';

type FetchTeamSuccess = FetchSuccess<Team>;
type FetchTeamDescriptionSuccess = FetchSuccess<TeamDescription>;
type FetchTeamsSuccess = FetchSuccess<TeamWithImage[]>;

export const getTeamById = (
  teamId: number
): Promise<FetchTeamDescriptionSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/${teamId}`)
    .then(
      (prop: AxiosResponse<TeamDescription>): FetchTeamDescriptionSuccess => {
        return { status: 'success', data: prop.data };
      }
    )
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームが見つかりませんでした' };
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
    .then(async (prop: AxiosResponse<Team>): Promise<
      FetchTeamSuccess | FetchFailed
    > => {
      const data = prop.data;
      if (file) {
        const image = createFormData('image', file);
        const res = await createImage(data.id, image, 'teams');
        if (res.status === 'success') {
          return { status: 'success', data };
        } else {
          return { status: 'error', message: '画像の作成に失敗しました' };
        }
      } else {
        return { status: 'error', message: 'ファイルが選択されていません' };
      }
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました' };
    });
  return res;
};

export const getTeamsRecord = (
  limit: number,
  offset: number
): Promise<FetchTeamsSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_teams_record/${limit}/${offset}`)
    .then((prop: AxiosResponse<TeamWithImage[]>): FetchTeamsSuccess => {
      const data = prop.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました。' };
    });

  return res;
};

export const searchTeams = (
  text: string,
  limit: number
): Promise<FetchTeamsSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/search_teams/${text}/${limit}`)
    .then((prop: AxiosResponse<TeamWithImage[]>): FetchTeamsSuccess => {
      const data = prop.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'チームの取得に失敗しました' };
    });
  return res;
};
