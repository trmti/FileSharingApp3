import { VFC } from 'react';
import { Typography, Card, Avatar, Row, Col } from 'antd';
import { TeamWithImage } from 'type';
import { colors, text_style } from 'app_design';
import { defaultCoverImage } from 'utils';

const { Meta } = Card;

type Props = {
  joinTeams: TeamWithImage[] | null;
  onClick: (id: number) => void;
};

const JoinTeam: VFC<Props> = ({ joinTeams, onClick }) => {
  if (joinTeams !== null) {
    return (
      <>
        <div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <Row gutter={30} wrap={false}>
            {joinTeams.map(
              ({
                cover_image,
                leader_image,
                team: { name, description, id },
              }) => {
                return (
                  <Col key={id}>
                    <Card
                      style={{
                        width: 300,
                        height: 350,
                      }}
                      bodyStyle={{ backgroundColor: colors.Card }}
                      cover={
                        <img
                          alt="team"
                          src={cover_image ? cover_image : defaultCoverImage}
                          height={250}
                          width="auto"
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      }
                      onClick={() => onClick(id)}
                      hoverable
                    >
                      <Meta
                        avatar={
                          <Avatar
                            src={
                              leader_image ? leader_image : defaultCoverImage
                            }
                          />
                        }
                        title={name}
                        description={
                          description ? description : 'No description'
                        }
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
          fontSize: text_style.Title_M.fontSize,
          margin: '50px 0 40px 100px',
          color: colors.Text.Gray,
        }}
      >
        所属しているチームがありません
      </Typography>
    );
  }
};

export default JoinTeam;
