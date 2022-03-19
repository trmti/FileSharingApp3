import { VFC } from 'react';
import { SignUpParams } from 'type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'auth/AuthUserContext';
import { Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import TitleWithLine from 'components/atoms/TileWithLine';
import FormLogin from 'components/organisms/FormLogin';

const Login: VFC = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const onFinish = async (data: SignUpParams) => {
    console.log('finish');
    try {
      await login({ email: data.email, password: data.password });
      navigate('../user');
    } catch {
      message.error('ユーザーが存在しません。');
    }
  };
  const onFinishFailed = () => {
    message.error('メールアドレス、もしくはパスワードの形式が正しくありません');
  };
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: '100%' }}
      size="large"
    >
      <TitleWithLine>ログイン</TitleWithLine>
      <FormLogin
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '100%', paddingTop: 40 }}
      />
      <Typography.Link>
        <Link to="/signup">サインアップページ</Link>
      </Typography.Link>
    </Space>
  );
};

export default Login;
