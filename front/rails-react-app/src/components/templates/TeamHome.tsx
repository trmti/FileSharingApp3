import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Modal, Spin, Button, Affix, Menu } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TeamHeader from 'components/organisms/TeamHeader';
import FormUpdateTeam from 'components/organisms/FormTeam';
import Folders from 'components/organisms/Folders';
import FormBuildFolder from 'components/organisms/FormFolder';
import BackButton from 'components/molecules/BackButton';
import DescriptionDropdown from 'components/molecules/DescriptionDropdown';
import JoinRequets from 'components/organisms/JoinRequets';
import NumberCircle from 'components/atoms/NumberCircle';
import {
  User,
  TeamDescription,
  FolderWithImage,
  BuildFolderParams,
  UpdateTeamParams,
  TeamJoinStates,
} from 'type';
import { colors, text_style } from 'app_design';

const buttonParam = {
  unJoin: {
    color: colors.Theme.Main,
    text: '参加',
    disabled: false,
    text_color: 'black',
  },
  waitingJoin: {
    color: colors.IconGray,
    text: '参加申請中',
    disabled: true,
    text_color: 'white',
  },
  join: {
    color: colors.Theme.Sub_Light,
    text: '参加中',
    disabled: true,
    text_color: 'white',
  },
};

type Props = {
  teamProp: TeamDescription | null;
  folders: FolderWithImage[] | null;
  onClickCard: (id: number) => void;
  CreateFolder: (data: BuildFolderParams) => Promise<void>;
  CreateFolderFailed: () => void;
  UpdateTeam: (data: UpdateTeamParams) => Promise<void>;
  UpdateTeamFailed: () => void;
  JoinTeam: () => void;
  onDelete: () => Promise<void>;
  isCreateModalVisible: boolean;
  setIsCreateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLeader: boolean;
  isEditor: boolean;
  loadingFolders: boolean;
  joinState: TeamJoinStates;
  requests: User[];
  AddEditor: (id: number) => void;
  RejectEditor: (id: number) => void;
};

const Home: FC<Props> = ({
  teamProp,
  folders,
  onClickCard,
  CreateFolder,
  CreateFolderFailed,
  UpdateTeam,
  UpdateTeamFailed,
  JoinTeam,
  onDelete,
  isCreateModalVisible,
  setIsCreateModalVisible,
  isEditModalVisible,
  setIsEditModalVisible,
  isLeader,
  isEditor,
  loadingFolders,
  joinState,
  requests,
  AddEditor,
  RejectEditor,
}) => {
  const [isJoinModalVisible, setIsJoinModalVisible] = useState<boolean>(false);
  const [isRequestsModalVisible, setIsRequestsModalVisible] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const onClickNewFolder = () => {
    setIsCreateModalVisible(true);
  };
  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsJoinModalVisible(false);
    setIsRequestsModalVisible(false);
  };
  const joinParams = joinState ? buttonParam[joinState] : null;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
          style={{ marginBottom: 30 }}
        />
        {teamProp !== null && teamProp?.team.id && isLeader ? (
          <div style={{ position: 'relative' }}>
            <DescriptionDropdown
              onDelete={onDelete}
              style={{ marginRight: 50 }}
              isEditModalVisible={isEditModalVisible}
              setIsEditModalVisible={setIsEditModalVisible}
              optionalItem={
                <Menu.Item key={2}>
                  <a
                    onClick={() => {
                      setIsRequestsModalVisible(true);
                    }}
                  >
                    申請
                  </a>
                </Menu.Item>
              }
              FormUpdate={
                <FormUpdateTeam
                  onFinish={UpdateTeam}
                  onFinishFailed={UpdateTeamFailed}
                  loading={loadingFolders}
                  teamName={teamProp.team.name}
                  description={teamProp.team.description}
                  authority={teamProp.team.publish_range}
                />
              }
            />
            {requests.length > 0 ? (
              <div style={{ position: 'absolute', top: -20, right: 20 }}>
                <NumberCircle
                  number={requests.length}
                  size={30}
                  color={colors.IconOrange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <TeamHeader team={teamProp} />
      <Divider style={{ borderTop: `3px solid ${colors.Border}` }} />
      {loadingFolders ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} />} />
      ) : (
        <Folders
          folders={folders}
          onClick={onClickCard}
          onClickNewFolder={onClickNewFolder}
          publish_range={teamProp?.team.publish_range}
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
      <Modal
        title="参加申請"
        visible={isJoinModalVisible}
        onCancel={handleCancel}
        onOk={() => {
          JoinTeam();
          setIsJoinModalVisible(false);
        }}
      >
        参加申請を送りますか？
      </Modal>
      <Modal
        title="参加申請一覧"
        visible={isRequestsModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <JoinRequets
          requests={requests}
          AddEditor={AddEditor}
          RejectEditor={RejectEditor}
        />
      </Modal>
      {joinParams ? (
        <Affix offsetBottom={30} style={{ position: 'absolute', right: 30 }}>
          <Button
            disabled={joinParams.disabled}
            style={{
              width: 200,
              height: 80,
              borderRadius: 80,
              backgroundColor: joinParams.color,
              color: joinParams.text_color,
              opacity: 0.8,
              ...text_style.Button,
            }}
            onClick={() => {
              setIsJoinModalVisible(true);
            }}
          >
            {joinParams.text}
          </Button>
        </Affix>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
