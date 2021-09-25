import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface IProps extends TextInputProps {
  active?: boolean;
}

const Input: React.FC<IProps> = ({ active = false, ...rest }) => {
  return <Container active={active} {...rest} />;
};

export { Input };
