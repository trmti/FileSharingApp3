import { VFC } from 'react';
import { Form, Input, Button, Space, FormProps } from 'antd';
import { colors, text_style } from 'app_design';

type Props = {
  onFinish: (value: {}) => void;
  onFinishFailed: () => void;
} & FormProps;

const FormLogin: VFC<Props> = (props) => {
  const { onFinish, onFinishFailed, ...other } = props;
  return (
    <>
      <Form
        name="formLogin"
        wrapperCol={{ span: 30 }}
        initialValues={{ remember: true }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...other}
      >
        <Space direction="vertical" size="large">
          <Form.Item
            label="メールアドレス"
            name="email"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="sample@gmail.com" />
          </Form.Item>
          <Form.Item
            label="パスワード"
            name="password"
            rules={[
              { required: true, message: 'パスワードを入力してください' },
            ]}
          >
            <Input.Password />
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
              fontSize: text_style.Button.font_size,
              letterSpacing: text_style.Button.letter_spacing,
            }}
          >
            登録
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLogin;
