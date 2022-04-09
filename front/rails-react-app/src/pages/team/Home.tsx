import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  User,
  Folder,
  TeamDescription,
  FolderWithImage,
  BuildFolderParams,
  UpdateTeamParams,
  TeamJoinStates,
} from 'type';
import { useAuthUser } from 'auth/AuthUserContext';
import { createSome, updateSome } from 'db/utils';
import {
  getTeamById,
  addWaitingUser,
  addNewEditor,
  removeEditor,
  rejectNewEditor,
  getTeamJoinStatus,
  getWaitingUsers,
} from 'db/team';
import { deleteSome } from 'db/utils';
import { getFoldersByTeamId } from 'db/folders';
import { isInLeader, isInEditor } from 'utils';
import HomeTemp from 'components/templates/TeamHome';

type stateProps = {
  teamProp: TeamDescription | null;
  folders: FolderWithImage[] | null;
  loadingTeam: boolean;
  loadingFolders: boolean;
  joinState: TeamJoinStates;
  requests: User[];
};

const setNewFolders = async (
  setState: React.Dispatch<React.SetStateAction<stateProps>>,
  teamId: number
) => {
  setState((prevState) => ({ ...prevState, loadingFolders: true }));
  const folders = await getFoldersByTeamId(Number(teamId));
  if (folders.status === 'success') {
    setState((prevState) => ({ ...prevState, folders: folders.data }));
  } else {
    setState((prevState) => ({ ...prevState, folders: null }));
  }
  setState((prevState) => ({ ...prevState, loadingFolders: false }));
};

const Home: FC = () => {
  const [state, setState] = useState<stateProps>({
    teamProp: null,
    folders: null,
    loadingTeam: false,
    loadingFolders: false,
    joinState: null,
    requests: [],
  });
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const authUser = useAuthUser();
  let { teamId } = useParams();
  const navigate = useNavigate();
  const onClickCard = (id: number) => {
    navigate(`folder/${id}`);
  };

  const CreateFolder = async (data: BuildFolderParams) => {
    if (teamId) {
      const res = await createSome<Folder>(
        'teams',
        'folder',
        data,
        Number(teamId)
      );
      if (res.status === 'success') {
        setIsCreateModalVisible(false);
        message.success('フォルダを作成しました');
        await setNewFolders(setState, Number(teamId));
      } else if (res.status === 'continue') {
        setIsCreateModalVisible(false);
        message.info(res.message);
        await setNewFolders(setState, Number(teamId));
      } else {
        message.error(
          'フォルダの作成に失敗しました。時間をおいて再度お試しください。'
        );
      }
    }
  };
  const CreateFolderFailed = () => {
    message.error('入力されていない項目があります。');
  };

  const UpdateTeam = async (data: UpdateTeamParams) => {
    if (teamId) {
      const res = await updateSome('teams', data, Number(teamId));
      if (res.status !== 'error') {
        message.success('チームの情報を更新しました');
        setIsEditModalVisible(false);
        const teamReload = await getTeamById(Number(teamId));
        if (teamReload.status === 'success') {
          setState((prevState) => ({
            ...prevState,
            teamProp: teamReload.data,
          }));
        } else {
          message.error('チームが見つかりませんでした');
          navigate('..');
        }
      } else {
        message.error(res.message);
      }
    }
  };
  const UpdateTeamFailed = () => {
    message.error('チームの更新に失敗しました');
  };

  const JoinTeam = async () => {
    if (teamId && authUser?.id) {
      let res;
      if (state.teamProp?.team.publish_range === 'public') {
        res = await addNewEditor(Number(teamId), authUser.id);
      } else {
        res = await addWaitingUser(Number(teamId), authUser.id);
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
      } else {
        message.error(res.message);
      }
    }
  };

  const RemoveTeam = async () => {
    if (teamId && authUser?.id && !isLeader) {
      const res = await removeEditor(Number(teamId), authUser.id);
      if (res.status === 'success') {
        setState((prevState) => ({
          ...prevState,
          joinState: 'unJoin',
        }));
        message.success('チームを抜けました。');
      } else {
        message.error('チームの脱退に失敗しました。');
      }
    } else {
      message.error('リーダーはチームを抜けられません。');
    }
  };

  const onDelete = async () => {
    const res = await deleteSome(Number(teamId), 'teams');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate('..');
    } else {
      message.error(res.message);
    }
  };

  const addEditor = async (id: number) => {
    const res = await addNewEditor(Number(teamId), id);
    if (res.status === 'success') {
      setState((prevState) => ({
        ...prevState,
        requests: prevState.requests.filter((request) => {
          return request.id !== id;
        }),
      }));
    } else {
      message.error('編集者の追加に失敗しました。');
    }
  };

  const rejectEditor = async (id: number) => {
    const res = await rejectNewEditor(Number(teamId), id);
    if (res.status === 'success') {
      setState((prevState) => ({
        ...prevState,
        requests: prevState.requests.filter((request) => {
          return request.id !== id;
        }),
      }));
    } else {
      message.error('編集者の拒否に失敗しました。');
    }
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loadingTeam: true }));
    if (!teamId) {
      message.error('パラメータが正しくありません');
      return;
    }
    (async () => {
      const res = await getTeamById(Number(teamId));
      if (res.status === 'success') {
        setState((prevState) => ({ ...prevState, teamProp: res.data }));
        await setNewFolders(setState, Number(teamId));
        setState((prevState) => ({ ...prevState, loadingTeam: false }));
      } else {
        setState((prevState) => ({ ...prevState, teamProp: null }));
        message.error('チームが存在しません');
        navigate('..');
      }
    })();
  }, [teamId]);

  useEffect(() => {
    (async () => {
      if (authUser) {
        const isLeader = await isInLeader(Number(teamId), authUser.id);
        setIsLeader(isLeader);
        setIsEditor(await isInEditor(Number(teamId), authUser.id));
        const joinState = await getTeamJoinStatus(Number(teamId), authUser.id);
        setState((prevState) => ({ ...prevState, joinState }));
        if (isLeader) {
          const res = await getWaitingUsers(Number(teamId));
          if (res.status === 'success') {
            const requests = res.data;
            setState((prevState) => ({ ...prevState, requests }));
          }
        }
      }
    })();
  }, [authUser, teamId]);

  return (
    <>
      {state.loadingTeam ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ marginTop: '10vh', fontSize: 300 }} />
          }
          style={{ width: '100%' }}
        />
      ) : (
        <HomeTemp
          {...state}
          isLeader={isLeader}
          isEditor={isEditor}
          setIsCreateModalVisible={setIsCreateModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
          isCreateModalVisible={isCreateModalVisible}
          isEditModalVisible={isEditModalVisible}
          onClickCard={onClickCard}
          CreateFolder={CreateFolder}
          CreateFolderFailed={CreateFolderFailed}
          UpdateTeam={UpdateTeam}
          UpdateTeamFailed={UpdateTeamFailed}
          JoinTeam={JoinTeam}
          RemoveTeam={RemoveTeam}
          onDelete={onDelete}
          AddEditor={addEditor}
          RejectEditor={rejectEditor}
        />
      )}
    </>
  );
};

export default Home;
