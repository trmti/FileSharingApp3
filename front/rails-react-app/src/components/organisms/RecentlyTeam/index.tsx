import { FC } from 'react';
import { Typography, Card, Avatar, Row, Col } from 'antd';
import { colors, text_style } from 'app_design';

import { TeamWithImage } from 'type';

const { Meta } = Card;

type Props = {
  recentlyTeams: TeamWithImage[] | null;
  onClick: (id: number) => void;
};

const JoinTeam: FC<Props> = ({ recentlyTeams, onClick }) => {
  if (recentlyTeams !== null) {
    return (
      <>
        <div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <Row gutter={30} wrap={false}>
            {recentlyTeams.map(
              ({ cover_image, leader_image, name, description, id }) => {
                return (
                  <Col key={id}>
                    <Card
                      style={{ width: 300, height: 350 }}
                      cover={
                        <img
                          alt="team"
                          src={cover_image}
                          height={250}
                          width="auto"
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      }
                      bodyStyle={{ backgroundColor: colors.Card }}
                      onClick={() => onClick(id)}
                      hoverable
                    >
                      <Meta
                        avatar={<Avatar src={leader_image} />}
                        title={name}
                        description={description}
                      />
                    </Card>
                  </Col>
                );
              }
            )}
          </Row>
        </div>
      </>
    );
  } else {
    return (
      <Typography
        style={{
          fontSize: text_style.Title_M.font_size,
          margin: '50px 0 40px 100px',
          color: colors.Text.Gray,
        }}
      >
        最近追加されたチームがありません
      </Typography>
    );
  }
};

export default JoinTeam;
