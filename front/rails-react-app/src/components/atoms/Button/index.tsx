import { VFC } from 'react';
import styled from 'styled-components';
import Text from 'components/atoms/Text';
import { pixel, percent } from 'type';
import { colors, text_style } from 'app_design';

type CustomButtonProps = {
  width: pixel;
  height: pixel;
  color: string;
  opacity: percent;
};

const CustomButton = styled.button<CustomButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.height};
  background: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  border: none;
`;

type Props = {
  text: string;
  width?: pixel;
  height?: pixel;
  color?: string;
  small?: boolean;
  opacity?: percent;
};
const Button: VFC<Props> = ({
  text,
  width = '200px',
  height = '80px',
  small = false,
  opacity = '100%',
  color = colors.Theme.Main,
}) => {
  if (!small) {
    return (
      <CustomButton
        width={width}
        height={height}
        color={color}
        opacity={opacity}
      >
        <Text text={text} font_style={text_style.Button} />
      </CustomButton>
    );
  } else {
    return (
      <CustomButton
        width={width}
        height={height}
        color={color}
        opacity={opacity}
      >
        <Text text={text} font_style={text_style.Body_S} />
      </CustomButton>
    );
  }
};

export default Button;
