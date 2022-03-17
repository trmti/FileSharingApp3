import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { Layout } from 'antd';

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
        backgroundColor: 'black',
        left: 0,
        top: 80,
        bottom: 0,
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
        {props.map((prop, index) => {
          return (
            <>
              <Menu.Item
                icon={prop.icon}
                key={index}
                style={{ height: 80, fontSize: 30 }}
              >
                <Link to={prop.to}>{prop.text}</Link>
              </Menu.Item>
              <Menu.Divider />
            </>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default MySider;
