import { FC, useState } from 'react';
import { Form, Button, Space, Input, Typography, Select, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import { BuildTeamParams, publish_range } from 'type';
import { colors, text_style } from 'app_design';

const { Title } = Typography;
const { Option } = Select;

type Props = {
  onFinish: (data: BuildTeamParams) => Promise<void>;
  onFinishFailed: () => void;
  loading: boolean;
  teamName?: string;
  description?: string;
  authority?: publish_range;
};

const FormBuildTeam: FC<Props> = ({
  onFinish,
  onFinishFailed,
  loading,
  teamName,
  description,
  authority,
}) => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const props = {
    beforeUpload: () => {
      return false;
    },
    onChange: (data: any) => {
      setFile(data.file);
      return false;
    },
    maxCount: 1,
  };
  return (
    <>
      <Form
        name="formBuildTeam"
        wrapperCol={{ span: 300 }}
        layout="vertical"
        onFinish={(data) => onFinish({ ...data, file })}
        onFinishFailed={onFinishFailed}
        initialValues={{
          name: teamName,
          description: description,
          publish_range: authority,
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form.Item
            label={<Title>TeamName</Title>}
            name="name"
            rules={[{ required: true, message: 'チーム名を入力してください' }]}
          >
            <Input
              placeholder="チーム名を入力してください"
              style={{ width: '100%', maxWidth: 500, height: 36 }}
            />
          </Form.Item>
          <Form.Item label={<Title>Description</Title>} name="description">
            <Input.TextArea
              placeholder="チームの詳細説明を入力してください"
              style={{ width: '100%', padding: 15 }}
              autoSize
            />
          </Form.Item>
          <Form.Item
            label={<Title>Authority</Title>}
            name="publish_range"
            rules={[
              { required: true, message: 'チームの公開範囲を選択してください' },
            ]}
          >
            <Select
              placeholder="チームの公開範囲を選択してください"
              style={{ width: 250, padding: 10 }}
            >
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>{' '}
              <Option value="open">Open</Option>
            </Select>
          </Form.Item>
          <Form.Item label={<Title>File</Title>}>
            <ImgCrop aspect={5 / 3} rotate>
              <Upload {...props} accept=".png, .jpg, .jpeg">
                <Button>select File</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Space>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
            loading={loading}
            disabled={loading}
            style={{
              width: '180px',
              height: '60px',
              marginTop: '40px',
              marginLeft: '40px',
              color: colors.Text.Gray,
              fontSize: text_style.Button.fontSize,
              letterSpacing: text_style.Button.letterSpacing,
            }}
          >
            作成
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormBuildTeam;
