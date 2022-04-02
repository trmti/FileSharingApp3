import { FC } from 'react';
import { File } from 'type';
import { Typography, Button, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Files from 'components/organisms/Files';
import BackButton from 'components/molecules/BackButton';

const { Option } = Select;

type Props = {
  files: File[] | null;
  onClick: (id: number) => void;
  onChangeSort: (value: string) => void;
};

const Folder: FC<Props> = ({ files, onClick, onChangeSort }) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  return (
    <>
      <BackButton
        onClick={() => {
          navigate(`../team/${teamId}`);
        }}
      ></BackButton>
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
    </>
  );
};

export default Folder;
