import { VFC } from 'react';
import { SignUpParams } from 'type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignup } from 'auth/AuthUserContext';
import SignupTemp from 'components/templates/Signup';

const Signup: VFC = () => {
  const navigate = useNavigate();
  const signup = useSignup();
  const onFinish = async (data: SignUpParams) => {
    try {
      await signup(data);
      navigate('../user');
    } catch (err) {
      message.error(
        'ユーザーの作成に失敗しました。時間をおいて再度お試しください'
      );
    }
  };
  const onFinishFailed = () => {
    message.error('入力様式が正しくありません。');
  };
  return <SignupTemp onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default Signup;
