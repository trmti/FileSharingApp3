import { FC } from 'react';
import { FileWithImage, BuildFileParams } from 'type';
import { Typography, Button, Select, Affix, Modal } from 'antd';
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
      <div style={{ display: 'flex' }}>
        <BackButton
          onClick={() => {
            navigate(`../team/${teamId}`);
          }}
        />
        <Typography.Title style={{ marginLeft: '30%' }}>
          {folderName}
        </Typography.Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography.Title style={{ marginTop: 30, flex: 1 }}>
          ファイル
        </Typography.Title>
        <div style={{ flex: 4, margin: 'auto' }}>
          <Button
            type="primary"
            shape="round"
            style={{ marginLeft: '30%', width: '40%', height: 50 }}
          >
            スライドショー
          </Button>
        </div>
        <div style={{ flex: 1, margin: 'auto' }}>
          <Select
            defaultValue="newer"
            onChange={onChangeSort}
            style={{ width: 150, marginRight: '30%' }}
          >
            <Option value="newer">新しい順</Option>
            <Option value="older">古い順</Option>
            <Option value="popular">人気順</Option>
          </Select>
        </div>
      </div>
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
