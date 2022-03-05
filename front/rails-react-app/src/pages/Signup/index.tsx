import { VFC } from 'react';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import { colors, text_style } from 'app_design';

const Signup: VFC = () => {
  return (
    <>
      <Text
        text="新規登録"
        font_style={text_style.Title_M}
        underline={true}
        color={colors.Text.Black}
      />
      <Button text="ikko" />
    </>
  );
};

export default Signup;
