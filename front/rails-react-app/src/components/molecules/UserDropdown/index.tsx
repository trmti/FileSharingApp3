import React, { FC } from 'react';
import { Menu, Dropdown } from 'antd';

type Props = {
  onClickProfile: () => void;
  onClickLogout: () => void;
  children: React.ReactNode;
};

type OtherProps = {
  onClickProfile: () => void;
  onClickLogout: () => void;
};

const MenuDropdown: FC<OtherProps> = ({ onClickProfile, onClickLogout }) => {
  return (
    <>
      <Menu>
        <Menu.Item key={1}>
          <a onClick={onClickProfile}>プロフィール</a>
        </Menu.Item>
        <Menu.Item key={2}>
          <a style={{ color: 'red' }} onClick={onClickLogout}>
            ログアウト
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
};

const DescriptionDropdown: FC<Props> = ({
  onClickProfile,
  onClickLogout,
  children,
}) => {
  return (
    <Dropdown
      overlay={
        <MenuDropdown
          onClickProfile={onClickProfile}
          onClickLogout={onClickLogout}
        />
      }
      trigger={['click']}
      arrow
    >
      {children}
    </Dropdown>
  );
};

export default DescriptionDropdown;
