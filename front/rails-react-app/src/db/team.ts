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

type FetchImageFailed = { status: 'continue'; message: string };

type ids = { ids: number[] };
type id = { id: number };
type FetchIdsSuccess = FetchSuccess<ids>;
type FetchIdSuccess = FetchSuccess<id>;

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
): Promise<FetchTeamSuccess | FetchImageFailed | FetchFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post(`/user/create_team/${leader_id}`, { ...otherParams })
    .then(async (prop: AxiosResponse<Team>): Promise<
      FetchTeamSuccess | FetchImageFailed
    > => {
      const data = prop.data;
      if (file) {
        const image = createFormData('image', file);
        const res = await createImage(data.id, image, 'teams');
        if (res.status === 'success') {
          return { status: 'success', data };
        } else {
          return {
            status: 'continue',
            message: '画像の作成に失敗しました。',
          };
        }
      } else {
        return {
          status: 'continue',
          message:
            '画像ファイルが選択されていません\nホーム画像無しでチームを作成します。',
        };
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

export const getEditorIds = (
  team_id: number
): Promise<FetchIdsSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_editor_ids/${team_id}`)
    .then((prop: AxiosResponse<ids>): FetchIdsSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return {
        status: 'error',
        message: '管理者リストの取得に失敗しました。',
      };
    });

  return res;
};

export const getLeaderId = (
  teamId: number
): Promise<FetchIdSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_leader_id/${teamId}`)
    .then((prop: AxiosResponse<id>): FetchIdSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'リーダーIdの取得に失敗しました。' };
    });
  return res;
};
