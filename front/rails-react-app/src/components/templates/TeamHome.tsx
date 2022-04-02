import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Modal } from 'antd';
import TeamHeader from 'components/organisms/TeamHeader';
import Folders from 'components/organisms/Folders';
import FormBuildFolder from 'components/organisms/FormBuildFolder';
import BackButton from 'components/molecules/BackButton';
import { TeamDescription, FolderWithImage, BuildFolderParams } from 'type';
import { colors } from 'app_design';

type Props = {
  team: TeamDescription | null;
  folders: FolderWithImage[] | null;
  onClickCard: (id: number) => void;
  onFinish: (data: BuildFolderParams) => Promise<void>;
  onFinishFailed: () => void;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: FC<Props> = ({
  team,
  folders,
  onClickCard,
  onFinish,
  onFinishFailed,
  isModalVisible,
  setIsModalVisible,
}) => {
  const navigate = useNavigate();
  const onClickNewFolder = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <BackButton
        onClick={() => {
          navigate('..');
        }}
        style={{ marginBottom: 30 }}
      />
      <TeamHeader team={team} />
      <Divider style={{ borderTop: `3px solid ${colors.Border}` }} />
      <Folders
        folders={folders}
        onClick={onClickCard}
        onClickNewFolder={onClickNewFolder}
      />
      <Modal
        title="新規フォルダ作成"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <FormBuildFolder onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </Modal>
    </>
  );
};

export default Home;
