import { FC } from 'react';
import { FileWithImage, BuildFileParams } from 'type';
import { Typography, Button, Select, Affix, Modal, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Files from 'components/organisms/Files';
import BackButton from 'components/molecules/BackButton';
import DescriptionDropdown from 'components/molecules/DescriptionDropdown';
import FormBuildFile from 'components/organisms/FormBuildFile';
import { FileAddOutlined } from '@ant-design/icons';
import { text_style } from 'app_design';

const { Option } = Select;

type Props = {
  folderName: string | null;
  files: FileWithImage[] | null;
  onClick: (id: number) => void;
  onChangeSort: (value: string) => void;
  onFinish: (data: BuildFileParams) => Promise<void>;
  onFinishFailed: () => void;
  onDeleteFolder: () => Promise<void>;
  onDeleteFile: (fileId: number) => Promise<void>;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditor: boolean;
  loading: boolean;
};

const Folder: FC<Props> = ({
  folderName,
  files,
  onClick,
  onChangeSort,
  onFinish,
  onFinishFailed,
  onDeleteFolder,
  onDeleteFile,
  isModalVisible,
  setIsModalVisible,
  isEditor,
  loading,
}) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const handleOnClickButton = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Row>
        <Col sm={4} xs={24}>
          <BackButton
            onClick={() => {
              navigate(`../team/${teamId}`);
            }}
          />
        </Col>
        <Col sm={17} xs={20}>
          <Typography.Title style={{ marginLeft: '40%' }}>
            {folderName}
          </Typography.Title>
        </Col>

        {isEditor ? (
          <Col sm={1} xs={4}>
            <DescriptionDropdown onDelete={onDeleteFolder} />
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
      {loading ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 300 }} />}
          style={{ width: '100%' }}
        />
      ) : (
        <Files
          files={files}
          onClick={onClick}
          style={{ marginRight: 50 }}
          isEditor={isEditor}
          onDelete={onDeleteFile}
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
        <FormBuildFile onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </Modal>
    </>
  );
};

export default Folder;
