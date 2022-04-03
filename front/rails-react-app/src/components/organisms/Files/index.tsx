import { FC } from 'react';
import { Row, Col, Card, Typography, Button, Image, Popconfirm } from 'antd';
import { FileWithImage } from 'type';
import { defaultCoverImage } from 'utils';
import { colors, text_style } from 'app_design';

const { Meta } = Card;

type Props = {
  files: FileWithImage[] | null;
  onClick: (id: number) => void;
  style?: {};
};

const Files: FC<Props> = ({ files, onClick, style }) => {
  const text = text_style.Body_S;
  if (files !== null) {
    return (
      <div style={{ ...style }}>
        <Row gutter={[30, 50]} justify="center">
          <Image.PreviewGroup>
            {files.map(
              ({ image, comment_count, file: { title, description, id } }) => {
                return (
                  <Col key={id} xl={6} md={8} sm={12} xs={24}>
                    <Card
                      bodyStyle={{
                        backgroundColor: colors.Card,
                        position: 'relative',
                      }}
                      cover={
                        <Image
                          alt="team"
                          src={image ? image : defaultCoverImage}
                          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                      }
                      onClick={() => onClick(id)}
                      hoverable
                    >
                      <Meta
                        title={title ? title : 'No Title'}
                        description={
                          <Popconfirm
                            title={
                              <div
                                style={{
                                  width: 300,
                                  overflowWrap: 'break-word',
                                }}
                              >
                                <p
                                  style={{
                                    whiteSpace: 'pre-wrap',
                                  }}
                                >
                                  {description ? description : 'No Description'}
                                </p>
                              </div>
                            }
                            icon={null}
                            showCancel={false}
                          >
                            <Typography.Paragraph ellipsis>
                              {description ? description : 'No Description'}
                            </Typography.Paragraph>
                          </Popconfirm>
                        }
                      />
                      <Row
                        justify="space-between"
                        style={{ alignItems: 'flex-end' }}
                      >
                        <Typography.Paragraph
                          style={{ marginTop: 30, marginBottom: 5, ...text }}
                        >
                          <span style={{ color: colors.Theme.Sub }}>
                            {comment_count - 1}件
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
          </Image.PreviewGroup>
        </Row>
      </div>
    );
  } else {
    return <>test</>;
  }
};

export default Files;
