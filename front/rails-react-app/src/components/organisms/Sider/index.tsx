import React, { VFC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { colors } from 'app_design';

const { Sider } = Layout;

type Props = {
  props: {
    icon: React.ReactNode;
    text: string;
    to: string;
  }[];
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  small: boolean;
};

const MySider: VFC<Props> = ({ props, setIsCollapsed, isCollapsed, small }) => {
  const handleOnClick = () => {
    if (isCollapsible) {
      setIsCollapsed(true);
    }
  };
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);
  return (
    <Sider
      style={{
        height: '100vh',
        position: 'fixed',
        zIndex: 2,
        left: 0,
        top: small ? 60 : 80,
        bottom: 0,
      }}
      onCollapse={(collapsed) => {
        setIsCollapsed(collapsed);
      }}
      onBreakpoint={(broken) => {
        setIsCollapsible(broken);
        setIsCollapsed(broken);
      }}
      collapsed={isCollapsed}
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        style={{ background: colors.Card }}
      >
        {props.map((prop, index) => {
          return (
            <>
              <Menu.Item
                icon={prop.icon}
                key={index}
                style={{ height: 80, fontSize: 30 }}
              >
                <Link
                  to={prop.to}
                  onClick={handleOnClick}
                  style={{
                    color: colors.Text.Black,
                    fontSize: 30,
                    fontFamily: 'HiraKakuProN-W6',
                  }}
                >
                  {prop.text}
                </Link>
              </Menu.Item>
              <Menu.Divider style={{ border: `2px solid ${colors.Border}` }} />
            </>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default MySider;
