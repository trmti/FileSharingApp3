import { VFC } from 'react';
import SignupTemp from 'components/templates/Signup';

const Signup: VFC = () => {
  const onFinish = (values: any) => {
    console.log(values);
    console.log(process.env.REACT_APP_API_HOST);
  };
  const onFinishFailed = () => {};
  return <SignupTemp onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default Signup;
