import { VFC } from 'react';
import { Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import FormSignup from 'components/organisms/FormSignup';
import styles from './style.module.css';

type Props = {
  onFinish: (values: any) => void;
  onFinishFailed: () => void;
};

const Signup: VFC<Props> = ({ onFinish, onFinishFailed }) => {
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: '100%' }}
      size="large"
    >
      <Typography.Title className={styles.titleText}>新規登録</Typography.Title>
      <FormSignup
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.Form}
      />
      <Typography.Link>
        <Link to="/login">ログインページ</Link>
      </Typography.Link>
    </Space>
  );
};

export default Signup;
