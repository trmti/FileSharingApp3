import { FC, useState } from 'react';
import { useAuthUser } from 'auth/AuthUserContext';
import useFolder from 'Hooks/team/Folder';
import { Typography, Button, Select, Affix, Modal, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Files from 'components/organisms/Files';
import BackButton from 'components/molecules/BackButton';
import DescriptionDropdown from 'components/molecules/DescriptionDropdown';
import FormBuildFile from 'components/organisms/FormFile';
import FormUpdateFolder from 'components/organisms/FormFolder';
import { FileAddOutlined } from '@ant-design/icons';
import { text_style } from 'app_design';

const { Option } = Select;

const Folder: FC = () => {
  const { folderId, teamId } = useParams();
  const authUser = useAuthUser();
  const [
    { loadingFolder, folder, isEditor, files },
    {
      UpdateFolder,
      UpdateFolderFailed,
      DeleteFolder,
      onChangeSort,
      onDeleteFile,
      UpdateFile,
      UpdateFileFailed,
      BuildFile,
      BuildFileFailed,
    },
  ] = useFolder(Number(folderId), Number(teamId), authUser);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onClickFile = (id: number) => {
    console.log(id);
  };

  const navigate = useNavigate();
  const handleOnClickButton = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (!loadingFolder && !folder) {
    return <></>;
  } else if (loadingFolder) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 400 }} />}
        style={{ width: '100%' }}
      />
    );
  } else {
    return (
      <>
        <Row>
          <Col sm={4} xs={24}>
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            />
          </Col>
          <Col sm={17} xs={20}>
            <Typography.Title style={{ marginLeft: '40%' }}>
              {folder?.title}
            </Typography.Title>
          </Col>

          {isEditor ? (
            <Col sm={1} xs={4}>
              <DescriptionDropdown
                onDelete={DeleteFolder}
                FormUpdate={
                  <FormUpdateFolder
                    onFinish={UpdateFolder}
                    onFinishFailed={UpdateFolderFailed}
                    title={folder?.title}
                    description={folder?.description}
                  />
                }
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col sm={6} xs={24}>
            <Typography.Title
              style={{ marginTop: 15, flex: 1, ...text_style.Title_S }}
            >
              ファイル一覧
            </Typography.Title>
          </Col>
          <Col sm={12} xs={18}>
            <Button
              type="primary"
              shape="round"
              style={{ marginLeft: '20%', width: '60%', height: 50 }}
            >
              スライドショー
            </Button>
          </Col>
          <Col sm={6} xs={6}>
            <Select
              defaultValue="newer"
              onChange={onChangeSort}
              style={{ width: '90%', maxWidth: 150, marginTop: 10 }}
            >
              <Option value="newer">新しい順</Option>
              <Option value="older">古い順</Option>
              <Option value="popular">人気順</Option>
            </Select>
          </Col>
        </Row>
        {loadingFolder ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 300 }} />}
            style={{ width: '100%' }}
          />
        ) : (
          <Files
            files={files}
            onClick={onClickFile}
            style={{ marginRight: 50 }}
            isEditor={isEditor}
            onDelete={onDeleteFile}
            UpdateFile={UpdateFile}
            UpdateFileFailed={UpdateFileFailed}
          />
        )}
        <Affix offsetBottom={30} style={{ position: 'fixed', right: 30 }}>
          <Button
            type="default"
            size="large"
            shape="round"
            icon={<FileAddOutlined />}
            onClick={handleOnClickButton}
            style={{
              width: 200,
              height: 80,
              opacity: 0.8,
              ...text_style.Button,
            }}
          >
            Add File
          </Button>
        </Affix>
        <Modal
          title="新規ファイル作成"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <FormBuildFile
            onFinish={BuildFile}
            onFinishFailed={BuildFileFailed}
          />
        </Modal>
      </>
    );
  }
};

export default Folder;
