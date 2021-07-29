import React, { useState, useCallback } from 'react';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionTypeSelect = useCallback((type: 'up' | 'down') => {
    setTransactionType(type);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />

          <TransactionType>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionType>

          <CategorySelect title="Category" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};

export { Register };
