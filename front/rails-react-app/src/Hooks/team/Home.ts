import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { updateSome, deleteSome, createSome } from 'db/utils';
import {
  getTeamJoinStatus,
  getTeamById,
  addNewEditor,
  addWaitingUser,
  removeEditor,
  rejectNewEditor,
  getWaitingUsers,
} from 'db/team';
import { getFoldersByTeamId } from 'db/folders';
import { isInEditor, isInLeader, useAsyncCallback } from 'utils';
import {
  User,
  TeamJoinStates,
  TeamDescription,
  UpdateTeamParams,
  FolderWithImage,
  BuildFolderParams,
  Folder,
} from 'type';

type userProps = {
  joinState: TeamJoinStates | null;
  isLeader: boolean;
  isEditor: boolean;
  teamProp: TeamDescription | undefined;
  requests: User[];
  loadingFolders: boolean;
  loadingTeam: boolean;
  folders: FolderWithImage[];
};

const useHome = (teamId: number, authUser: User | null) => {
  const [state, setState] = useState<userProps>({
    joinState: null,
    isLeader: false,
    isEditor: false,
    teamProp: undefined,
    requests: [],
    loadingFolders: false,
    loadingTeam: false,
    folders: [],
  });
  const navigate = useNavigate();

  const setNewTeam = useAsyncCallback(async () => {
    const res = await getTeamById(teamId);
    if (res.status === 'success') {
      setState((prevState) => ({ ...prevState, teamProp: res.data }));
    } else {
      setState((prevState) => ({ ...prevState, teamProp: undefined }));
      message.error('チームが存在しません');
      navigate('..');
    }
  }, [teamId]);

  // ----- team --------------------------------
  const UpdateTeam = useAsyncCallback(
    async (data: UpdateTeamParams) => {
      if (teamId) {
        const res = await updateSome('teams', data, teamId);
        if (res.status !== 'error') {
          message.success('チームの情報を更新しました');
          const teamReload = await getTeamById(teamId);
          if (teamReload.status === 'success') {
            setState((prevState) => ({
              ...prevState,
              teamProp: teamReload.data,
            }));
          } else {
            navigate('..');
          }
        }
      }
    },
    [teamId]
  );
  const UpdateTeamFailed = () => {
    message.error('チームの更新に失敗しました');
  };
  const JoinTeam = async () => {
    if (teamId && authUser?.id) {
      let res;
      if (state.teamProp?.team.publish_range === 'public') {
        res = await addNewEditor(teamId, authUser.id);
      } else {
        res = await addWaitingUser(teamId, authUser.id);
      }
      if (res.status === 'success') {
        message.success('参加申請を送りました。');
        if (state.teamProp?.team.publish_range === 'public') {
          setState((prevState) => ({
            ...prevState,
            joinState: 'join',
          }));
        }
        setState((prevState) => ({ ...prevState, joinState: 'waitingJoin' }));
      }
    }
  };
  const LeaveTeam = async () => {
    if (teamId && authUser?.id && !state.isLeader) {
      const res = await removeEditor(teamId, authUser.id);
      if (res.status === 'success') {
        setState((prevState) => ({
          ...prevState,
          joinState: 'unJoin',
        }));
        message.success('チームを抜けました。');
      }
    }
  };
  const DeleteTeam = useAsyncCallback(async () => {
    const res = await deleteSome(teamId, 'teams');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate('..');
    }
  }, [teamId]);

  // ----- editor ------------------------------
  const addEditor = useAsyncCallback(
    async (id: number) => {
      const res = await addNewEditor(teamId, id);
      if (res.status === 'success') {
        setState((prevState) => ({
          ...prevState,
          requests: prevState.requests.filter((request) => {
            return request.id !== id;
          }),
        }));
      }
    },
    [teamId]
  );
  const rejectEditor = useAsyncCallback(
    async (id: number) => {
      const res = await rejectNewEditor(teamId, id);
      if (res.status === 'success') {
        setState((prevState) => ({
          ...prevState,
          requests: prevState.requests.filter((request) => {
            return request.id !== id;
          }),
        }));
      }
    },
    [teamId]
  );

  // ---- folder --------------------------------
  const setNewFolders = useAsyncCallback(async () => {
    setState((prevState) => ({ ...prevState, loadingFolders: true }));
    const folders = await getFoldersByTeamId(teamId);
    if (folders.status === 'success') {
      setState((prevState) => ({ ...prevState, folders: folders.data }));
    } else {
      setState((prevState) => ({ ...prevState, folders: [] }));
    }
    setState((prevState) => ({ ...prevState, loadingFolders: false }));
  }, [teamId]);
  const CreateFolder = useAsyncCallback(
    async (data: BuildFolderParams) => {
      const res = await createSome<Folder>('teams', 'folder', data, teamId);
      if (res.status !== 'error') {
        message.success('フォルダを作成しました');
        await setNewFolders();
      }
    },
    [teamId]
  );
  const CreateFolderFailed = () => {
    message.error('入力されていない項目があります。');
  };

  // ユーザーのチームの参加状態をセット
  useEffect(() => {
    (async () => {
      if (authUser && teamId) {
        const isLeader = await isInLeader(teamId, authUser.id);
        const isEditor = await isInEditor(teamId, authUser.id);
        const joinState = await getTeamJoinStatus(teamId, authUser.id);
        setState((prevState) => ({
          ...prevState,
          isLeader: isLeader,
          isEditor: isEditor,
          joinState: joinState,
        }));
      }
    })();
  }, [authUser, teamId]);
  // チームの情報をセット
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loadingTeam: true }));
    if (!teamId) {
      message.error('パラメータが正しくありません');
    } else {
      (async () => {
        await setNewTeam();
        setState((prevState) => ({ ...prevState, loadingTeam: false }));
      })();
    }
  }, [teamId, setNewTeam]);
  // 参加待ちユーザー一覧をセット
  useEffect(() => {
    (async () => {
      if (state.isLeader) {
        const res = await getWaitingUsers(teamId);
        if (res.status === 'success') {
          const requests = res.data;
          setState((prevState) => ({ ...prevState, requests }));
        }
      }
    })();
  }, [state.isLeader, teamId]);
  // フォルダー一覧をセット
  useEffect(() => {
    (async () => {
      setState((prevState) => ({ ...prevState, loadingFolders: true }));
      await setNewFolders();
      setState((prevState) => ({ ...prevState, loadingFolders: false }));
    })();
  }, [authUser, teamId, setNewFolders]);
  return [
    state,
    {
      UpdateTeam,
      UpdateTeamFailed,
      JoinTeam,
      LeaveTeam,
      DeleteTeam,
      addEditor,
      rejectEditor,
      CreateFolder,
      CreateFolderFailed,
    },
  ] as const;
};

export default useHome;
