import { FC } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import UserIcon from 'components/molecules/UserIcon';
import { defaultCoverImage } from 'utils';
import { User } from 'type';
import { colors } from 'app_design';

type Props = {
  requests: User[];
  AddEditor: (id: number) => void;
  RejectEditor: (id: number) => void;
};

const JoinRequets: FC<Props> = ({ requests, AddEditor, RejectEditor }) => {
  return (
    <>
      <Row>
        <Col span={8}>
          <Typography.Title>Name</Typography.Title>
        </Col>
        <Col span={8}>
          <Typography.Title>Icon</Typography.Title>
        </Col>
        <Col xs={8} sm={4}></Col>
        <Col xs={16} sm={4}></Col>
      </Row>
      {requests.map((request, index) => (
        <Row key={index} gutter={[30, 30]}>
          <Col span={8}>
            <Typography.Text>{request.name}</Typography.Text>
          </Col>
          <Col span={8}>
            <UserIcon
              src={request.image ? request.image : defaultCoverImage}
              name={request.name}
              BG={colors.IconOrange}
              small
            />
          </Col>
          <Col xs={8} sm={4}>
            <Button
              type="primary"
              shape="round"
              size="small"
              onClick={() => AddEditor(request.id)}
            >
              許可
            </Button>
          </Col>
          <Col
            xs={22}
            sm={4}
            style={{ textAlign: 'right' }}
            onClick={() => RejectEditor(request.id)}
          >
            <Button type="default" shape="round" size="small">
              拒否
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default JoinRequets;
