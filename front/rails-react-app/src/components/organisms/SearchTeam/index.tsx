import { FC } from 'react';
import { Typography, Card, Avatar, Row, Col } from 'antd';
import { colors, text_style } from 'app_design';

import { TeamWithImage } from 'type';

const { Meta } = Card;

type Props = {
  searchedTeams: TeamWithImage[] | null;
  onClickCard: (id: number) => void;
};

const SearchTeam: FC<Props> = ({ searchedTeams, onClickCard }) => {
  if (searchedTeams !== null) {
    return (
      <>
        <div
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <Row gutter={[50, 100]}>
            {searchedTeams.map(
              ({ cover_image, leader_image, name, description, id }) => {
                return (
                  <Col key={id} span={8}>
                    <Card
                      cover={
                        <img
                          alt="team"
                          src={cover_image}
                          width="33%"
                          style={{
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                          }}
                        />
                      }
                      bodyStyle={{ backgroundColor: colors.Card }}
                      onClick={() => onClickCard(id)}
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
          fontSize: text_style.Title_M.fontSize,
          margin: '50px 0 40px 100px',
          color: colors.Text.Gray,
        }}
      >
        チームが見つかりませんでした
      </Typography>
    );
  }
};

export default SearchTeam;
