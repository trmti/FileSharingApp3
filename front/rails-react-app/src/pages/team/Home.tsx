import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'auth/AuthUserContext';
import useHome from 'Hooks/team/Home';
import { useParams } from 'react-router-dom';
import { Divider, Modal, Spin, Button, Affix, Menu } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BuildTeamParams, BuildFolderParams } from 'type';
import TeamHeader from 'components/organisms/TeamHeader';
import FormUpdateTeam from 'components/organisms/FormTeam';
import Folders from 'components/organisms/Folders';
import FormBuildFolder from 'components/organisms/FormFolder';
import BackButton from 'components/molecules/BackButton';
import DescriptionDropdown from 'components/molecules/DescriptionDropdown';
import JoinRequests from 'components/organisms/JoinRequests';
import NumberCircle from 'components/atoms/NumberCircle';
import { colors, text_style } from 'app_design';

const buttonParam = {
  unJoin: {
    color: colors.Theme.Main,
    text: '参加',
    disabled: false,
    text_color: 'black',
    message: '参加申請を送りますか？',
  },
  waitingJoin: {
    color: colors.IconGray,
    text: '参加申請中',
    disabled: true,
    text_color: 'white',
    message: '',
  },
  join: {
    color: colors.Theme.Sub_Light,
    text: '参加中',
    disabled: false,
    text_color: 'white',
    message: 'チームを抜けますか？',
  },
};

const Home: FC = () => {
  const { teamId } = useParams();
  const authUser = useAuthUser();
  const [isJoinModalVisible, setIsJoinModalVisible] = useState<boolean>(false);
  const [isRequestsModalVisible, setIsRequestsModalVisible] =
    useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [
    {
      joinState,
      isLeader,
      isEditor,
      teamProp,
      requests,
      loadingFolders,
      folders,
      loadingTeam,
    },
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
  ] = useHome(Number(teamId), authUser);
  const onClickCard = (id: number) => {
    navigate(`../folder/${id}`);
  };
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
  if (!loadingTeam) {
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
                onDelete={DeleteTeam}
                style={{ marginRight: 50 }}
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
                optionalItem={
                  <Menu.Item key={2}>
                    <p
                      onClick={() => {
                        setIsRequestsModalVisible(true);
                      }}
                    >
                      申請
                    </p>
                  </Menu.Item>
                }
                FormUpdate={
                  <FormUpdateTeam
                    onFinish={async (data: BuildTeamParams) => {
                      await UpdateTeam(data);
                      setIsEditModalVisible(false);
                    }}
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
            onFinish={async (
              data: BuildFolderParams & {
                id: number;
              }
            ) => {
              await CreateFolder(data);
              setIsCreateModalVisible(false);
            }}
            onFinishFailed={CreateFolderFailed}
          />
        </Modal>
        <Modal
          title="参加申請一覧"
          visible={isRequestsModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <JoinRequests
            requests={requests}
            AddEditor={addEditor}
            RejectEditor={rejectEditor}
          />
        </Modal>
        {joinParams ? (
          <>
            <Affix
              offsetBottom={30}
              style={{ position: 'absolute', right: 30 }}
            >
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
            <Modal
              title="参加申請"
              visible={isJoinModalVisible}
              onCancel={handleCancel}
              onOk={() => {
                if (joinState === 'join') {
                  LeaveTeam();
                } else if (joinState === 'unJoin') {
                  JoinTeam();
                }
                setIsJoinModalVisible(false);
              }}
            >
              {joinParams.message}
            </Modal>
          </>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return (
      <Spin
        indicator={
          <LoadingOutlined style={{ marginTop: '10vh', fontSize: 300 }} />
        }
        style={{ width: '100%' }}
      />
    );
  }
};

export default Home;
