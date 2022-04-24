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

type stateProps = {
  user: User | null;
  isModalVisible: boolean;
  coverImage: string | undefined;
  file: FormData | undefined;
};

const Profile: FC = () => {
  const authUser = useAuthUser();
  const [state, setState] = useState<stateProps>({
    user: authUser,
    isModalVisible: false,
    coverImage: undefined,
    file: undefined,
  });
  const handleGetImage = async () => {
    if (authUser !== null && authUser.post_id) {
      const userImage = await getPostByUserId(authUser.id);
      if (userImage.status === 'success') {
        setState((prevState) => ({
          ...prevState,
          coverImage: userImage.data.image.url,
        }));
      }
    }
  };
  const props = {
    beforeUpload: () => {
      return false;
    },
    onChange: (data: any) => {
      const form = createFormData('image', data.file);
      setState((prevState) => ({
        ...prevState,
        file: form,
      }));
      return false;
    },
    maxCount: 1,
  };
  useEffect(() => {
    handleGetImage();
  }, [authUser]);
  if (state.user) {
    return (
      <>
        <Row justify="center" style={{ width: '90%' }}>
          <Col span={22}>
            <Image
              src={state.coverImage ? state.coverImage : defaultCoverImage}
              width={'80%'}
              height={'auto'}
              style={{ maxWidth: 600, aspectRatio: '5/3' }}
            />
          </Col>
          <Col
            span={2}
            onClick={() => {
              setState((prevState) => ({ ...prevState, isModalVisible: true }));
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
                  if (state.user) {
                    const res = await updateSome<User>(
                      'user',
                      { name: name },
                      state.user.id
                    );
                    if (res.status !== 'error') {
                      setState((prevState) => ({
                        ...prevState,
                        user: prevState.user,
                      }));
                    }
                  }
                },
              }}
            >
              {state.user?.name}
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
                  if (state.user) {
                    const res = await updateSome<User>(
                      'user',
                      { message: message },
                      state.user.id
                    );
                    if (res.status !== 'error') {
                      setState((prevState) => ({
                        ...prevState,
                        user: prevState.user,
                      }));
                    }
                  }
                },
              }}
            >
              {state.user?.message}
            </Title>
          </Col>
        </Row>
        <Modal
          title="画像を変更"
          visible={state.isModalVisible}
          onCancel={() => {
            setState((prevState) => ({ ...prevState, isModalVisible: false }));
          }}
          footer={null}
        >
          <Form
            onFinish={async () => {
              if (state.file && state.user) {
                const res = await createOrUpdateImage(
                  state.user?.id,
                  state.file,
                  'user',
                  'update'
                );
                if (res.status === 'success') {
                  setState((prevState) => ({
                    ...prevState,
                    isModalVisible: false,
                  }));
                  await handleGetImage();
                  message.success('プロフィール画像を変更しました。');
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
