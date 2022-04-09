import { VFC } from 'react';
import { SignUpParams } from 'type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignup } from 'auth/AuthUserContext';
import { Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import TitleWithLine from 'components/atoms/TileWithLine';
import FormSignup from 'components/organisms/FormSignup';

const Signup: VFC = () => {
  const navigate = useNavigate();
  const signup = useSignup();
  const onFinish = async (data: SignUpParams) => {
    try {
      await signup(data);
      navigate('/user/home');
    } catch (err) {
      message.error(
        'ユーザーの作成に失敗しました。時間をおいて再度お試しください'
      );
    }
  };
  const onFinishFailed = () => {
    message.error('入力様式が正しくありません。');
  };
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: '100%' }}
      size="large"
    >
      <TitleWithLine>新規登録</TitleWithLine>
      <FormSignup
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '100%', paddingTop: 40 }}
      />
      <Typography.Link>
        <Link to="/login">ログインページ</Link>
      </Typography.Link>
    </Space>
  );
};

export default Signup;
