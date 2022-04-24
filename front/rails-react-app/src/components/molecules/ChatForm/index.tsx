import { FC, useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

type Props = {
  onSend: (text: string) => void;
};

const ChatForm: FC<Props> = ({ onSend }) => {
  const [value, setValue] = useState<string>('');
  return (
    <div style={{ display: 'flex' }}>
      <Input.TextArea
        value={value}
        onChange={(e: any) => {
          setValue(e.currentTarget.value);
        }}
        autoSize={{ minRows: 1 }}
      />
      <Button
        shape="circle"
        size="large"
        onClick={() => {
          onSend(value);
          setValue('');
        }}
        icon={<SendOutlined />}
        style={{ marginLeft: 10 }}
      />
    </div>
  );
};

export default ChatForm;
