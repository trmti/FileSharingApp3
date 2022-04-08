import { FC } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const StyledBr = styled.br`
  padding-bottom: 100px;
`;

const TopPage: FC = () => {
  return (
    <>
      <Title>Share-Kosenとは？</Title>
      <Paragraph>
        先輩から過去問を受け取って争奪戦になるの、もう疲れませんか？
        <StyledBr />
        LINEで実験データを共有して学校やLINEの中でそのデータについて詳しく話し合うの、もう疲れませんか？
        <StyledBr />
        Share-Kosenではアップロードしたファイルに説明書きを加えて他の人にわかりやすくしたり、それぞれのファイルについて
        <StyledBr />
        チャットで話し合ったりできます。
        <StyledBr />
        また、一度アップロードしたファイルや話し合った内容はそのまま後輩や他人に受け継ぎができ、過去問戦争に終止符を打ちます。
        <StyledBr />
        (本アプリではこのページのデザイン担当を募集しています。Webデザインに興味のある方は知識0でも構いませんのでぜひご連絡ください。)
      </Paragraph>
    </>
  );
};

export default TopPage;
