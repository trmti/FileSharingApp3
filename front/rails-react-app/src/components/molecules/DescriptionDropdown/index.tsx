import React, { FC, useState } from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type Props = {
  onDelete: () => Promise<void>;
  FormUpdate: React.ReactChild;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
  small?: boolean;
};

const menu = (
  onDelete: () => Promise<void>,
  FormUpdate: React.ReactChild,
  isEditModalVisible: boolean,
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
  };
  return (
    <>
      <Menu>
        <Menu.Item key={1}>
          <a
            onClick={() => {
              setIsEditModalVisible(true);
            }}
          >
            編集
          </a>
        </Menu.Item>
        <Menu.Item key={2}>
          <a
            style={{ color: 'red' }}
            onClick={() => {
              setIsDeleteModalVisible(true);
            }}
          >
            削除
          </a>
        </Menu.Item>
      </Menu>
      <Modal
        title="削除"
        onOk={onDelete}
        onCancel={handleCancel}
        visible={isDeleteModalVisible}
      >
        <p>本当に削除してよろしいですか？</p>
      </Modal>
      <Modal
        title="編集"
        onCancel={handleCancel}
        footer={null}
        visible={isEditModalVisible}
      >
        {FormUpdate}
      </Modal>
    </>
  );
};

const DescriptionDropdown: FC<Props> = ({
  onDelete,
  style,
  FormUpdate,
  isEditModalVisible,
  setIsEditModalVisible,
  small = false,
}) => {
  return (
    <div style={style}>
      <Dropdown
        overlay={menu(
          onDelete,
          FormUpdate,
          isEditModalVisible,
          setIsEditModalVisible
        )}
        trigger={['click']}
        arrow
      >
        <MoreOutlined style={small ? { fontSize: 15 } : { fontSize: 30 }} />
      </Dropdown>
    </div>
  );
};

export default DescriptionDropdown;