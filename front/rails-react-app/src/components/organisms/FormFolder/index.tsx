import { FC, useState } from 'react';
import { Form, Button, Space, Input, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import { BuildFolderParams } from 'type';
import { colors, text_style } from 'app_design';

const { Title } = Typography;

type Props = {
  onFinish: (data: BuildFolderParams & { id: number }) => Promise<void>;
  onFinishFailed: () => void;
  title?: string;
  description?: string | null;
};

const FormFolder: FC<Props> = ({
  onFinish,
  onFinishFailed,
  title,
  description,
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
        initialValues={{ title: title, description: description }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form.Item
            label={<Title>FolderName</Title>}
            name="title"
            rules={[
              { required: true, message: 'フォルダ名を入力してください' },
            ]}
          >
            <Input
              placeholder="フォルダ名を入力してください"
              style={{ width: '100%', height: 36 }}
            />
          </Form.Item>
          <Form.Item label={<Title>Description</Title>} name="description">
            <Input.TextArea
              placeholder="フォルダの詳細説明を入力してください"
              style={{ width: '100%', padding: 15 }}
              autoSize
            />
          </Form.Item>
          <Form.Item label={<Title>Image</Title>}>
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

export default FormFolder;
