import { FC } from 'react';
import { Row, Col, Typography, Image, Avatar, Affix } from 'antd';
import UserIcon from 'components/molecules/UserIcon';
import { colors, text_style } from 'app_design';
import { defaultCoverImage } from 'utils';
import { TeamDescription } from 'type';

const { Title, Paragraph } = Typography;

type Props = {
  team: TeamDescription | undefined;
};

const TeamHeader: FC<Props> = ({ team }) => {
  const translate = {
    private: 'プライベート',
    public: 'パブリック',
    open: 'オープン',
  };
  if (team != null) {
    const {
      team: { name, description, publish_range },
      image,
      leader,
      authors,
    } = team;
    return (
      <>
        <Title style={{ marginLeft: 10 }}>{name}</Title>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Image
              src={image ? image : defaultCoverImage}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '5/3',
              }}
              width="100%"
              height="auto"
            />
          </Col>
          <Col md={12} xs={24}>
            <Paragraph ellipsis>{description}</Paragraph>
            <div>
              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <Col span={12}>
                  <Title style={{ display: 'inline', color: colors.Text.Gray }}>
                    Leader
                  </Title>
                </Col>
                <Col span={12}>
                  <UserIcon
                    src={leader.image ? leader.image : defaultCoverImage}
                    name={leader.name}
                    BG={colors.IconBlue}
                    style={{ lineHeight: '100%' }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col sm={24} lg={12}>
                  <Title
                    style={{
                      display: 'inline',
                      color: colors.Text.Gray,
                    }}
                  >
                    Authority
                  </Title>
                </Col>
                <Col sm={24} lg={12}>
                  <Paragraph
                    style={{
                      display: 'inline',
                      color: colors.Text.Black,
                      lineHeight: '50px',
                      marginLeft: 30,
                      ...text_style.Title_S,
                    }}
                  >
                    {translate[publish_range]}
                  </Paragraph>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Title
                    style={{
                      display: 'inline',
                      color: colors.Text.Gray,
                    }}
                  >
                    Authors
                  </Title>
                </Col>
                <Col span={24}>
                  <Avatar.Group
                    maxCount={5}
                    style={{ overflow: 'scroll', marginLeft: 30 }}
                  >
                    {authors.map((author, index) => (
                      <UserIcon
                        key={index}
                        src={author.image ? author.image : defaultCoverImage}
                        name={author.name}
                        BG={colors.IconOrange}
                      />
                    ))}
                  </Avatar.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </>
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
