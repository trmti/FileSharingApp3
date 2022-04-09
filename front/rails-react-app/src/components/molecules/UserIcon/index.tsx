import { FC } from 'react';
import { Avatar } from 'antd';
import { colors, text_style } from 'app_design';

type Props = {
  src: string | null;
  name: string;
  BG: string;
  style?: React.CSSProperties;
  small?: boolean;
};

const UserIcon: FC<Props> = ({ src, name, BG, style, small }) => {
  const bodyM = text_style.Body_M;
  return (
    <div
      style={{
        width: small ? 80 : 120,
        height: small ? 30 : 40,
        borderRadius: small ? 30 : 40,
        backgroundColor: BG,
        display: 'inline-block',
        ...style,
      }}
    >
      <Avatar
        src={src}
        style={{ marginLeft: 10, marginTop: 3, display: 'inline-block' }}
        size={small ? 'small' : 'default'}
      />
      <p
        style={{
          margin: 0,
          marginLeft: small ? 5 : 15,
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
