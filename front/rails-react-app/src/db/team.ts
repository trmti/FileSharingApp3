import { getAction, postAction } from './utils';
import { TeamWithImage, TeamDescription, User } from 'type';

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

export const getTeamsByUserId = (userId: number) => {
  const res = getAction<TeamWithImage[]>(
    `user/get_join_teams/${userId}`,
    'チームの取得に失敗しました'
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

export const getWaitingUsers = (teamId: number) => {
  const res = getAction<User[]>(
    `/teams/get_waiting_users/${teamId}`,
    '参加申請中のユーザー一覧の取得に失敗しました。'
  );
  return res;
};

export const getTeamJoinStatus = (teamId: number, userId: number) => {
  const res = getAction<ids>(
    `/teams/get_editor_ids/${teamId}`,
    '参加中のユーザー一覧の取得に失敗しました。'
  )
    .then((props) => {
      if (props.status === 'success') {
        if (props.data.ids.includes(userId)) {
          return 'join';
        } else {
          throw new Error();
        }
      } else {
        return null;
      }
    })
    .catch(async () => {
      const res = await getAction<ids>(
        `/teams/get_waiting_user_ids/${teamId}`,
        '参加申請中のユーザー一覧の取得に失敗しました。'
      );
      if (res.status === 'success') {
        if (res.data.ids.includes(userId)) {
          return 'waitingJoin';
        } else {
          return 'unJoin';
        }
      } else {
        return null;
      }
    });
  return res;
};

// ----- post --------------------------------

export const addWaitingUser = (teamId: number, userId: number) => {
  const res = postAction(
    `/teams/add_waiting_user/${teamId}`,
    { user_id: userId },
    '参加申請に失敗しました。'
  );
  return res;
};

export const addNewEditor = (teamId: number, userId: number) => {
  const res = postAction(
    `/teams/add_editor/${teamId}`,
    { user_id: userId },
    '参加申請に失敗しました。'
  );
  return res;
};

export const rejectNewEditor = (teamId: number, userId: number) => {
  const res = postAction(
    `/teams/reject_editor/${teamId}`,
    { user_id: userId },
    'リジェクトに失敗しました。'
  );
  return res;
};

export const removeEditor = (teamId: number, userId: number) => {
  const res = postAction(
    `/teams/remove_editor/${teamId}`,
    { user_id: userId },
    '削除に失敗しました。'
  );
  return res;
};
