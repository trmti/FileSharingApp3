import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TeamHeader from 'components/organisms/TeamHeader';
import FormUpdateTeam from 'components/organisms/FormTeam';
import Folders from 'components/organisms/Folders';
import FormBuildFolder from 'components/organisms/FormFolder';
import BackButton from 'components/molecules/BackButton';
import DescriptionDropdown from 'components/molecules/DescriptionDropdown';
import {
  TeamDescription,
  FolderWithImage,
  BuildFolderParams,
  UpdateTeamParams,
} from 'type';
import { colors } from 'app_design';

type Props = {
  team: TeamDescription | null;
  folders: FolderWithImage[] | null;
  onClickCard: (id: number) => void;
  CreateFolder: (data: BuildFolderParams) => Promise<void>;
  CreateFolderFailed: () => void;
  UpdateTeam: (data: UpdateTeamParams) => Promise<void>;
  UpdateTeamFailed: () => void;
  onDelete: () => Promise<void>;
  isCreateModalVisible: boolean;
  setIsCreateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLeader: boolean;
  isEditor: boolean;
  loading: boolean;
};

const Home: FC<Props> = ({
  team,
  folders,
  onClickCard,
  CreateFolder,
  CreateFolderFailed,
  UpdateTeam,
  UpdateTeamFailed,
  onDelete,
  isCreateModalVisible,
  setIsCreateModalVisible,
  isEditModalVisible,
  setIsEditModalVisible,
  isLeader,
  isEditor,
  loading,
}) => {
  const navigate = useNavigate();
  const onClickNewFolder = () => {
    setIsCreateModalVisible(true);
  };
  const handleCancel = () => {
    setIsCreateModalVisible(false);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
          style={{ marginBottom: 30 }}
        />
        {team !== null && team?.team.id && isLeader ? (
          <DescriptionDropdown
            onDelete={onDelete}
            style={{ marginRight: 50 }}
            isEditModalVisible={isEditModalVisible}
            setIsEditModalVisible={setIsEditModalVisible}
            FormUpdate={
              <FormUpdateTeam
                onFinish={UpdateTeam}
                onFinishFailed={UpdateTeamFailed}
                loading={loading}
                teamName={team.team.name}
                description={team.team.description}
                authority={team.team.publish_range}
              />
            }
          />
        ) : (
          <></>
        )}
      </div>
      <TeamHeader team={team} />
      <Divider style={{ borderTop: `3px solid ${colors.Border}` }} />
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} />} />
      ) : (
        <Folders
          folders={folders}
          onClick={onClickCard}
          onClickNewFolder={onClickNewFolder}
          publish_range={team?.team.publish_range}
          isEditor={isEditor}
        />
      )}
      <Modal
        title="新規フォルダ作成"
        visible={isCreateModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <FormBuildFolder
          onFinish={CreateFolder}
          onFinishFailed={CreateFolderFailed}
        />
      </Modal>
    </>
  );
};

export default Home;
