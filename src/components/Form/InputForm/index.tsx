import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const InputForm: React.FC<IProps> = ({ control, name, error, ...rest }) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input value={value} onChangeText={onChange} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export { InputForm };
