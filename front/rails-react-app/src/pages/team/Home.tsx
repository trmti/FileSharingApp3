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
import { getTeamById } from 'db/team';
import { getFoldersByTeamId, createFolder } from 'db/folders';
import HomeTemp from 'components/templates/TeamHome';

type FetchTeamDescriptionSuccess = FetchSuccess<TeamDescription>;

const Home: FC = () => {
  const [teamProp, setTeamProp] = useState<TeamDescription | null>(null);
  const [folders, setFolders] = useState<FolderWithImage[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  let { teamId } = useParams();
  const navigate = useNavigate();
  let res: FetchTeamDescriptionSuccess | FetchFailed;
  const onClickCard = (id: number) => {
    navigate(`folder/${id}`);
  };
  const setNewFolders = async () => {
    const folders = await getFoldersByTeamId(Number(teamId));
    if (folders.status === 'success') {
      setFolders(folders.data);
    } else {
      setFolders(null);
    }
  };
  const onFinish = async (data: BuildFolderParams) => {
    if (teamId) {
      const res = await createFolder(data, Number(teamId));
      if (res.status === 'success') {
        setIsModalVisible(false);
        message.success('フォルダを作成しました');
        await setNewFolders();
      } else {
        message.error(
          'フォルダの作成に失敗しました。時間をおいて再度お試しください。'
        );
      }
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
        await setNewFolders();
      } else {
        setTeamProp(null);
      }
    })();
  }, []);
  return (
    <>
      <HomeTemp
        team={teamProp}
        folders={folders}
        onClickCard={onClickCard}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default Home;
