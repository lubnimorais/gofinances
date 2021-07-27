import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type IProps = TextInputProps;

const Input: React.FC<IProps> = ({ ...rest }) => {
  return <Container {...rest} />;
};

export { Input };
