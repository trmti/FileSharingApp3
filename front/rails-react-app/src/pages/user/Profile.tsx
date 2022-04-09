import { FC, useState, useEffect } from 'react';
import { useAuthUser } from 'auth/AuthUserContext';
import {
  Typography,
  Row,
  Col,
  Image,
  Modal,
  Form,
  Upload,
  Button,
  message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import { updateSome } from 'db/utils';
import { createOrUpdateImage, getPostByUserId } from 'db/post';
import { User } from 'type';
import { defaultCoverImage, createFormData } from 'utils';
import { colors, text_style } from 'app_design';

const { Title } = Typography;

const Profile: FC = () => {
  const authUser = useAuthUser();
  const [user, setUser] = useState<User | null>(authUser);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string>();
  const [file, setFile] = useState<FormData>();
  const handleGetImage = async () => {
    if (authUser !== null && authUser.post_id) {
      const userImage = await getPostByUserId(authUser.id);
      if (userImage.status === 'success') {
        setCoverImage(userImage.data.image.url);
      }
    }
  };
  const props = {
    beforeUpload: () => {
      return false;
    },
    onChange: (data: any) => {
      const form = createFormData('image', data.file);
      setFile(form);
      return false;
    },
    maxCount: 1,
  };
  useEffect(() => {
    handleGetImage();
  }, [authUser]);
  if (user) {
    return (
      <>
        <Row justify="center" style={{ width: '90%' }}>
          <Col span={22}>
            <Image
              src={coverImage ? coverImage : defaultCoverImage}
              width={'80%'}
              height={'auto'}
              style={{ maxWidth: 600, aspectRatio: '5/3' }}
            />
          </Col>
          <Col
            span={2}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            <UploadOutlined style={{ fontSize: 50 }} />
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col span={12}>
            <Title>Name</Title>
          </Col>
          <Col span={12}>
            <Title
              style={{ color: colors.Text.Gray }}
              editable={{
                onChange: async (name) => {
                  const res = await updateSome<User>(
                    'user',
                    { name: name },
                    user.id
                  );
                  if (res.status !== 'error') {
                    setUser({ ...user, name });
                  }
                },
              }}
            >
              {user?.name}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Title>Message</Title>
          </Col>
          <Col span={12}>
            <Title
              style={{ color: colors.Text.Gray }}
              editable={{
                onChange: async (message) => {
                  const res = await updateSome<User>(
                    'user',
                    { message: message },
                    user.id
                  );
                  if (res.status !== 'error') {
                    setUser({ ...user, message });
                  }
                },
              }}
            >
              {user?.message}
            </Title>
          </Col>
        </Row>
        <Modal
          title="画像を変更"
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          footer={null}
        >
          <Form
            onFinish={async () => {
              if (file) {
                const res = await createOrUpdateImage(
                  user?.id,
                  file,
                  'user',
                  'update'
                );
                if (res.status === 'success') {
                  setIsModalVisible(false);
                  await handleGetImage();
                  message.success('プロフィール画像を変更しました。');
                } else {
                  message.error(res.message);
                }
              } else {
                message.error('画像を選択してください。');
              }
            }}
          >
            <Form.Item label="File">
              <ImgCrop aspect={5 / 3} rotate>
                <Upload {...props} accept=".png, .jpg, .jpeg">
                  <Button>select File</Button>
                </Upload>
              </ImgCrop>
            </Form.Item>{' '}
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
                変更
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
};

export default Profile;
