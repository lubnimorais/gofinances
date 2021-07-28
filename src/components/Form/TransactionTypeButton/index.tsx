import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface IProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

const TransactionTypeButton: React.FC<IProps> = ({
  type,
  title,
  isActive,
  ...rest
}) => {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
};

export { TransactionTypeButton };
