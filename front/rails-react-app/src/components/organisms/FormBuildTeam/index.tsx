import { FC } from 'react';
import { Typography, Form, Button } from 'antd';

type Props = {
  onClickButton: (data: {
    name: string;
    description: string;
    authority: 'private' | 'public';
  }) => Promise<void>;
};
