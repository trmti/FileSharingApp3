import { FC, useState, useEffect } from 'react';
import { Typography, Button, Layout, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, text_style } from 'app_design';

const { Title } = Typography;
const { Header } = Layout;

const Logo = styled.p`
  font-size: 30px;
  color: #000;
  font-family: 'Utopia Std';
`;

type headerProps = {
  small: boolean;
};

const CustomHeader = styled(Header)<headerProps>`
  background-color: ${colors.BG};
  width: ${(props) => (props.small ? '70%' : '90%')};
  height: 160px;
  margin-top: 50px;
  margin-left: 80px;
  padding: 0;
`;

type divProps = {
  color: string;
  small: boolean;
};

const CustomDiv = styled.div<divProps>`
  border: 20px solid ${(props) => props.color};
  text-align: center;
  width: 100%;
  height: auto;
  aspect-ratio: ${(props) => (props.small ? '5/2' : '4/5')};
`;

type imgProps = {
  small: boolean;
};

const CustomImg = styled.img<imgProps>`
  width: ${(props) => (props.small ? '100%' : '60%')};
  height: auto;
  max-width: 800px;
  margin: 0 auto;
`;

const TitleText = styled(Title)`
  color: ${colors.Text.Gray};
  margin-top: 80px;
  position: relative;
  margin-bottom: 5px;
  ::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -15px;
    display: inline-block;
    width: 130px;
    height: 2px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: black;
    border-radius: 2px;
  }
`;

const DescriptionText = styled(Title)`
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  font-size: ${text_style.Title_M.fontSize};
  letter-spacing: ${text_style.Title_M.letterSpacing};
`;

const StartButton = styled(Button)`
  background-color: ${colors.Theme.Sub};
  color: white;
  width: 300px;
  height: 80px;
  border-radius: 80px;
  margin: 0 auto;
  margin: 80px auto;
  font-size: ${text_style.Title_M.fontSize};
  letter-spacing: ${text_style.Title_M.letterSpacing};
`;

type DescriptionProps = {
  title: string;
  description: string;
  color: string;
  small: boolean;
};

const Description: FC<DescriptionProps> = ({
  title,
  description,
  color,
  small,
}) => {
  return (
    <CustomDiv color={color} small={small}>
      <TitleText>{title}</TitleText>
      <DescriptionText>{description}</DescriptionText>
    </CustomDiv>
  );
};

const TopPage: FC = () => {
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState<boolean>(window.innerWidth < 480);
  useEffect(() => {
    setIsSmall(window.innerWidth < 769);
    const onResize = () => {
      setIsSmall(window.innerWidth < 769);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <>
      <CustomHeader small={isSmall}>
        <Row style={{ width: '90%' }}>
          <Col span={22}>
            <Link to="/user/home">
              <Logo>Share-Kosen</Logo>
            </Link>
          </Col>
          <Col span={2}>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => {
                navigate('/login');
              }}
            >
              ログイン
            </Button>
          </Col>
        </Row>
      </CustomHeader>
      <Row style={{ width: '100%', marginBottom: 100 }}>
        <CustomImg
          src={`${process.env.PUBLIC_URL}/TopMes.png`}
          small={isSmall}
        />
      </Row>
      <Row gutter={[50, 50]} style={{ width: '90%', margin: '0 auto' }}>
        <Col lg={8} xs={24}>
          <Description
            title="チームを作る"
            description="チームを作って必要な人全員にデータを共有。"
            color={colors.Theme.Main}
            small={isSmall}
          />
        </Col>
        <Col lg={8} xs={24}>
          <Description
            title="チャットで話す"
            description="気になったことや、伝えたいことをチャットで確認。"
            color={colors.Theme.Sub_Light}
            small={isSmall}
          />
        </Col>
        <Col lg={8} xs={24}>
          <Description
            title="受け継ぐ"
            description="作ったファイルとチャットをチームに参加するだけで引き継ぎ。"
            color={colors.Text.Gray}
            small={isSmall}
          />
        </Col>
      </Row>
      <Row>
        <StartButton
          onClick={() => {
            navigate('/signup');
          }}
        >
          今すぐ始める
        </StartButton>
      </Row>
    </>
  );
};

export default TopPage;
