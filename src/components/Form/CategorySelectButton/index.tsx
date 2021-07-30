import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Category, Icon } from './styles';

interface IProps extends TouchableOpacityProps {
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
