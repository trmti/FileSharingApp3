import { FC } from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { File } from 'type';
import { defaultCoverImage } from 'utils';
import { colors, text_style } from 'app_design';

const { Meta } = Card;

type Props = {
  files: File[] | null;
  onClick: (id: number) => void;
  style?: {};
};

const Files: FC<Props> = ({ files, onClick, style }) => {
  const text = text_style.Body_S;
  if (files !== null) {
    return (
      <div style={{ ...style }}>
        <Row gutter={[30, 50]} justify="center">
          {files.map(
            ({ image, comment_count, file: { title, description, id } }) => {
              return (
                <Col key={id} xxl={6} lg={8} md={12} xs={24}>
                  <Card
                    bodyStyle={{
                      backgroundColor: colors.Card,
                      position: 'relative',
                    }}
                    cover={
                      <img
                        alt="team"
                        src={image ? image : defaultCoverImage}
                        width="33%"
                        style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                      />
                    }
                    onClick={() => onClick(id)}
                    hoverable
                  >
                    <Meta title={title} description={description} />
                    <Row
                      justify="space-between"
                      style={{ alignItems: 'flex-end' }}
                    >
                      <Typography.Paragraph
                        style={{ marginTop: 30, marginBottom: 5, ...text }}
                      >
                        <span style={{ color: colors.Theme.Sub }}>
                          {comment_count}件
                        </span>
                        のコメント
                      </Typography.Paragraph>
                      <Button
                        type="primary"
                        shape="round"
                        style={{ width: 100 }}
                      >
                        Chat
                      </Button>
                    </Row>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    );
  } else {
    return <>test</>;
  }
};

export default Files;
