import React, { FC, useState } from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type Props = {
  onDelete: () => Promise<void>;
  style?: React.CSSProperties;
  small?: boolean;
};

const menu = (onDelete: () => Promise<void>) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleOnClick = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Menu>
        <Menu.Item key={1}>
          <a style={{ color: 'red' }} onClick={handleOnClick}>
            削除
          </a>
        </Menu.Item>
      </Menu>
      <Modal
        title="削除"
        onOk={onDelete}
        onCancel={handleCancel}
        visible={isModalVisible}
      >
        <p>本当に削除してよろしいですか？</p>
      </Modal>
    </>
  );
};

const DescriptionDropdown: FC<Props> = ({ onDelete, style, small = false }) => {
  return (
    <div style={style}>
      <Dropdown overlay={menu(onDelete)} trigger={['click']} arrow>
        <MoreOutlined style={small ? { fontSize: 15 } : { fontSize: 30 }} />
      </Dropdown>
    </div>
  );
};

export default DescriptionDropdown;
