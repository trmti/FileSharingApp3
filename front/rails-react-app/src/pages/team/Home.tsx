import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  teamId: number
) => {
  setLoading(true);
  const folders = await getFoldersByTeamId(Number(teamId));
  if (folders.status === 'success') {
    setFolders(folders.data);
  } else {
    setFolders(null);
  }
  setLoading(false);
};

const Home: FC = () => {
  const [teamProp, setTeamProp] = useState<TeamDescription | null>(null);
  const [folders, setFolders] = useState<FolderWithImage[] | null>(null);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loadingTeam, setLoadingTeam] = useState<boolean>(false);
  const [loadingFolders, setLoadingFolders] = useState<boolean>(false);
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
        await setNewFolders(setFolders, setLoadingFolders, Number(teamId));
      } else if (res.status === 'continue') {
        setIsModalVisible(false);
        message.info(res.message);
        await setNewFolders(setFolders, setLoadingFolders, Number(teamId));
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
    setLoadingTeam(true);
    (async () => {
      res = teamId
        ? await getTeamById(Number(teamId))
        : { status: 'error', message: 'パラメータが正しくありません' };
      if (res.status === 'success') {
        setTeamProp(res.data);
        await setNewFolders(setFolders, setLoadingFolders, Number(teamId));
        setLoadingTeam(false);
      } else {
        setTeamProp(null);
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
      {loadingTeam ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ marginTop: '10vh', fontSize: 300 }} />
          }
          style={{ width: '100%' }}
        />
      ) : (
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
          loading={loadingFolders}
        />
      )}
    </>
  );
};

export default Home;
