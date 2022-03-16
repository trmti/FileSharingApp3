import { VFC } from 'react';
import { SignUpParams } from 'type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'auth/AuthUserContext';
import LoginTemp from 'components/templates/Login';

const Login: VFC = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const onFinish = async (data: SignUpParams) => {
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
  return <LoginTemp onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default Login;
