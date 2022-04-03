import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  TeamDescription,
  FolderWithImage,
  BuildFolderParams,
  FetchFailed,
  FetchSuccess,
} from 'type';
import { useAuthUser } from 'auth/AuthUserContext';
import { getTeamById } from 'db/team';
import { setInLeader, setInEditor } from 'utils';
import { deleteSome } from 'db/utils';
import { getFoldersByTeamId, createFolder } from 'db/folders';
import HomeTemp from 'components/templates/TeamHome';

type FetchTeamDescriptionSuccess = FetchSuccess<TeamDescription>;

const setNewFolders = async (
  setFolders: React.Dispatch<React.SetStateAction<FolderWithImage[] | null>>,
  teamId: number
) => {
  const folders = await getFoldersByTeamId(Number(teamId));
  if (folders.status === 'success') {
    setFolders(folders.data);
  } else {
    setFolders(null);
  }
};

const Home: FC = () => {
  const [teamProp, setTeamProp] = useState<TeamDescription | null>(null);
  const [folders, setFolders] = useState<FolderWithImage[] | null>(null);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const authUser = useAuthUser();
  let { teamId } = useParams();
  const navigate = useNavigate();
  let res: FetchTeamDescriptionSuccess | FetchFailed;
  const onClickCard = (id: number) => {
    navigate(`folder/${id}`);
  };
  const onFinish = async (data: BuildFolderParams) => {
    if (teamId) {
      const res = await createFolder(data, Number(teamId));
      if (res.status === 'success') {
        setIsModalVisible(false);
        message.success('フォルダを作成しました');
        await setNewFolders(setFolders, Number(teamId));
      } else {
        message.error(
          'フォルダの作成に失敗しました。時間をおいて再度お試しください。'
        );
      }
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
  const onFinishFailed = () => {
    message.error('入力されていない項目があります。');
  };
  useEffect(() => {
    (async () => {
      res = teamId
        ? await getTeamById(Number(teamId))
        : { status: 'error', message: 'パラメータが正しくありません' };
      if (res.status === 'success') {
        setTeamProp(res.data);
        await setNewFolders(setFolders, Number(teamId));
      } else {
        setTeamProp(null);
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
      <HomeTemp
        team={teamProp}
        folders={folders}
        onClickCard={onClickCard}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onDelete={onDelete}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isLeader={isLeader}
        isEditor={isEditor}
      />
    </>
  );
};

export default Home;
