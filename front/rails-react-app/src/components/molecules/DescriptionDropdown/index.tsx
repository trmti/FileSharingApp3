import React, { FC } from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type Props = {
  onDelete: () => Promise<void>;
  style?: React.CSSProperties;
  small?: boolean;
};

const menu = (onDelete: () => Promise<void>) => {
  return (
    <Menu>
      <Menu.Item key={1}>
        <a style={{ color: 'red' }} onClick={onDelete}>
          削除
        </a>
      </Menu.Item>
    </Menu>
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
