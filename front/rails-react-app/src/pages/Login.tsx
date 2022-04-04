import { FC, useState } from 'react';
import { SignUpParams } from 'type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'auth/AuthUserContext';
import { Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import TitleWithLine from 'components/atoms/TileWithLine';
import FormLogin from 'components/organisms/FormLogin';

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const login = useLogin();
  const navigate = useNavigate();
  const onFinish = async (data: SignUpParams) => {
    setLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      navigate(-1);
    } catch {
      message.error('ユーザーが存在しません。');
    }
    setLoading(false);
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
        loading={loading}
      />
      <Typography.Link>
        <Link to="/signup">サインアップページ</Link>
      </Typography.Link>
    </Space>
  );
};

export default Login;
