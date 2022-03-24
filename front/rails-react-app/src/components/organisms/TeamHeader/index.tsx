import { FC } from 'react';
import { Row, Col, Typography, Image, Avatar, Affix } from 'antd';
import UserIcon from 'components/molecules/UserIcon';
import { colors, text_style } from 'app_design';
import { TeamPageProps } from 'type';

const { Title, Paragraph } = Typography;

type Props = {
  team: TeamPageProps | null;
};

const TeamHeader: FC<Props> = ({ team }) => {
  const translate = { private: 'プライベート', public: 'パブリック' };
  if (team != null) {
    const { title, description, publish_range, image_url, leader, authors } =
      team;
    return (
      <Row gutter={30} style={{ height: '35vh' }}>
        <Col span={12}>
          <Title>{title}</Title>
          <Paragraph ellipsis>{description}</Paragraph>
          <Affix offsetBottom={10}>
            <Row justify="space-between" style={{ marginBottom: 40 }}>
              <Col>
                <Title style={{ display: 'inline', color: colors.Text.Gray }}>
                  Leader
                </Title>
                <UserIcon
                  src={leader.image_url}
                  name={leader.name}
                  BG={colors.IconBlue}
                  style={{ marginLeft: 20, lineHeight: '100%' }}
                />
              </Col>
              <Col>
                <Title style={{ display: 'inline', color: colors.Text.Gray }}>
                  権限
                </Title>
                <Paragraph
                  style={{
                    display: 'inline',
                    marginLeft: 50,
                    marginBottom: 10,
                    color: colors.Text.Black,
                    ...text_style.Title_S,
                  }}
                >
                  {translate[publish_range]}
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Title
                style={{
                  display: 'inline',
                  color: colors.Text.Gray,
                  marginRight: 40,
                }}
              >
                Authors
              </Title>
              <Avatar.Group maxCount={5} style={{ overflow: 'scroll' }}>
                {authors.map((author, index) => (
                  <UserIcon
                    key={index}
                    src={author.image_url}
                    name={author.name}
                    BG={colors.IconOrange}
                  />
                ))}
              </Avatar.Group>
            </Row>
          </Affix>
        </Col>
        <Col span={12}>
          <Image
            src={image_url}
            style={{
              width: 'auto',
              height: '35vh',
              aspectRatio: '5/3',
            }}
          />
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <p>チームが存在しません</p>
      </>
    );
  }
};

export default TeamHeader;
