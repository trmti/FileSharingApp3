import React, { FC, useState } from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type Props = {
  onDelete: () => Promise<void>;
  FormUpdate: React.ReactChild;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  optionalItem?: React.ReactNode;
  style?: React.CSSProperties;
  small?: boolean;
};

type OtherProps = {
  onDelete: () => Promise<void>;
  FormUpdate: React.ReactChild;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  optionalItem?: React.ReactNode;
};

const MenuDropdown: FC<OtherProps> = ({
  onDelete,
  FormUpdate,
  isEditModalVisible,
  setIsEditModalVisible,
  optionalItem,
}) => {
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
        {optionalItem}
        <Menu.Item key={10}>
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
  optionalItem,
  small = false,
}) => {
  return (
    <div style={style}>
      <Dropdown
        overlay={
          <MenuDropdown
            onDelete={onDelete}
            FormUpdate={FormUpdate}
            isEditModalVisible={isEditModalVisible}
            setIsEditModalVisible={setIsEditModalVisible}
            optionalItem={optionalItem}
          />
        }
        trigger={['click']}
        arrow
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreOutlined style={small ? { fontSize: 15 } : { fontSize: 30 }} />
        </span>
      </Dropdown>
    </div>
  );
};

export default DescriptionDropdown;
