import { FC } from 'react';
import { FileWithImage, BuildFileParams } from 'type';
import { Typography, Button, Select, Affix, Modal, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Files from 'components/organisms/Files';
import BackButton from 'components/molecules/BackButton';
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
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Folder: FC<Props> = ({
  folderName,
  files,
  onClick,
  onChangeSort,
  onFinish,
  onFinishFailed,
  isModalVisible,
  setIsModalVisible,
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
        <Col sm={20} xs={24}>
          <Typography.Title style={{ marginLeft: '30%' }}>
            {folderName}
          </Typography.Title>
        </Col>
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
      <Files files={files} onClick={onClick} style={{ marginRight: 50 }} />
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
