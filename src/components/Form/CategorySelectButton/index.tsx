import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface IProps extends RectButtonProps {
  title: string;
}

const CategorySelectButton: React.FC<IProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>

      <Icon name="chevron-down" />
    </Container>
  );
};

export { CategorySelectButton };
