import { FC } from 'react';
import { Avatar } from 'antd';
import { colors, text_style } from 'app_design';

type Props = {
  src: string;
  name: string;
  BG: string;
  style?: {};
};

const UserIcon: FC<Props> = ({ src, name, BG, style }) => {
  const bodyM = text_style.Body_M;
  return (
    <div
      style={{
        width: 120,
        height: 40,
        borderRadius: 40,
        backgroundColor: BG,
        display: 'inline-block',
        ...style,
      }}
    >
      <Avatar
        src={src}
        style={{ marginLeft: 10, marginTop: 3, display: 'inline-block' }}
      />
      <p
        style={{
          margin: 0,
          marginLeft: 15,
          verticalAlign: 'middle',
          display: 'inline-block',
          color: colors.Text.Gray,
          ...bodyM,
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default UserIcon;
