import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface IButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<IButtonProps> = ({ title, onPress, ...rest }) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export { Button };
