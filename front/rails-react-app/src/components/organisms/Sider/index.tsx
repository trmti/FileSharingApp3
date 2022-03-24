import React, { VFC } from 'react';
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
};

const MySider: VFC<Props> = ({ props }) => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        zIndex: 2,
        left: 0,
        top: 80,
        bottom: 0,
      }}
      width={300}
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
