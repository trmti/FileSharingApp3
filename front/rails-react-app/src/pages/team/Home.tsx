import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Folder,
  TeamDescription,
  FolderWithImage,
  BuildFolderParams,
  FetchFailed,
  FetchSuccess,
  UpdateTeamParams,
} from 'type';
import { useAuthUser } from 'auth/AuthUserContext';
import { createSome, updateSome } from 'db/utils';
import { getTeamById } from 'db/team';
import { setInLeader, setInEditor } from 'utils';
import { deleteSome } from 'db/utils';
import { getFoldersByTeamId } from 'db/folders';
import HomeTemp from 'components/templates/TeamHome';

type FetchTeamDescriptionSuccess = FetchSuccess<TeamDescription>;

type stateProps = {
  teamProp: TeamDescription | null;
  folders: FolderWithImage[] | null;
  loadingTeam: boolean;
  loadingFolders: boolean;
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
  });
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const authUser = useAuthUser();
  let { teamId } = useParams();
  const navigate = useNavigate();
  let res: FetchTeamDescriptionSuccess | FetchFailed;
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
  const onDelete = async () => {
    const res = await deleteSome(Number(teamId), 'teams');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate('..');
    } else {
      message.error(res.message);
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
        await setInLeader(setIsLeader, Number(teamId), authUser.id);
        await setInEditor(setIsEditor, Number(teamId), authUser.id);
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
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default Home;
