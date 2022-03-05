import { VFC } from 'react';
import { text_style, colors } from 'app_design';
import { text_style_type } from 'type';
import styled from 'styled-components';

type CustomProps = {
  font_style: text_style_type;
  underline: boolean;
  color: string;
};
const CustomText = styled.p<CustomProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.font_style.font_size};
  letter-spacing: ${(props) => props.font_style.letter_spacing};
  font-family: ${(props) => props.font_style.font_family};
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  position: relative;
  :before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -1px; /*線の上下位置*/
    display: inline-block;
    width: 200%;
    height: 3px; /*線の太さ*/
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%); /*位置調整*/
    background-color: ${colors.Border}; /*線の色*/
    border-radius: 2px; /*線の丸み*/
  }
`;

type Props = {
  text: string;
  font_style?: text_style_type;
  underline?: boolean;
  color?: string;
};

const Text: VFC<Props> = ({
  text,
  font_style = text_style.Body_M,
  underline = false,
  color = colors.Text.Black,
}) => {
  return (
    <CustomText font_style={font_style} underline={underline} color={color}>
      {text}
    </CustomText>
  );
};

export default Text;
