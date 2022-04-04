import { createFormData } from 'utils';
import { client } from './client';
import { getAction } from './utils';
import { createOrUpdateImage } from './post';
import {
  Team,
  TeamWithImage,
  TeamDescription,
  FetchFailed,
  FetchSuccess,
  BuildTeamParams,
  UpdateTeamParams,
} from 'type';

type FetchTeamSuccess = FetchSuccess<Team>;
type FetchImageFailed = { status: 'continue'; message: string };

type ids = { ids: number[] };
type id = { id: number };

// ---- get ----------------------------------------------------------------
export const getTeamById = (teamId: number) => {
  const res = getAction<TeamDescription>(
    `/teams/${teamId}`,
    'チームID一覧の取得に失敗しました。'
  );
  return res;
};

export const getTeamsRecord = (limit: number, offset: number) => {
  const res = getAction<TeamWithImage[]>(
    `/teams/get_teams_record/${limit}/${offset}`,
    'チームの取得に失敗しました。'
  );
  return res;
};

export const searchTeams = (text: string, limit: number) => {
  const res = getAction<TeamWithImage[]>(
    `/teams/search_teams/${text}/${limit}`,
    'チームの取得に失敗しました。'
  );
  return res;
};

export const getEditorIds = (team_id: number) => {
  const res = getAction<ids>(
    `/teams/get_editor_ids/${team_id}`,
    '管理者リストの取得に失敗しました。'
  );
  return res;
};

export const getLeaderId = (teamId: number) => {
  const res = getAction<id>(
    `/teams/get_leader_id/${teamId}`,
    'リーダーIdの取得に失敗しました。'
  );
  return res;
};

// export const createOrUpdateTeam = (
//   params: BuildTeamParams | UpdateTeamParams,
//   type: 'update' | 'create',
//   leader_id?: number,
//   team_id?: number
// ): Promise<FetchTeamSuccess | FetchImageFailed | FetchFailed> => {
//   const { file, ...otherParams } = params;
//   let action;
//   if (type === 'create' && leader_id) {
//     action = client.post<Team>(`/user/create_team/${leader_id}`, {
//       ...otherParams,
//     });
//   } else if (type === 'update' && team_id) {
//     action = client.patch<Team>(`/teams/${team_id}`, { ...otherParams });
//   } else {
//     return new Promise((resolve) => {
//       resolve({ status: 'error', message: '入力項目に不備があります。' });
//     });
//   }
//   const res = action
//     .then((props): Promise<
//       FetchSuccess<Team> | FetchFailed | FetchImageFailed
//     > => {
//       if (!file) {
//         throw new Error();
//       }
//       const data = props.data;
//       const image = createFormData('image', file);
//       const res = createOrUpdateImage(data.id, image, 'teams', 'create')
//         .then((props): FetchSuccess<Team> | FetchImageFailed => {
//           if (props.status === 'success') {
//             return { status: 'success', data };
//           } else {
//             throw new Error();
//           }
//         })
//         .catch((): FetchImageFailed => {
//           return {
//             status: 'continue',
//             message: '画像の作成に失敗しました。',
//           };
//         });
//       return res;
//     })
//     .catch((): FetchImageFailed => {
//       return { status: 'continue', message: 'チームを更新しました。' };
//     });
//   return res;
// };
