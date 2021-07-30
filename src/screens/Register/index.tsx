import React, { useState, useCallback } from 'react';
import { Modal } from 'react-native';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState<ICategory>({
    key: 'category',
    name: 'Categoria',
  });

  const handleTransactionTypeSelect = useCallback((type: 'up' | 'down') => {
    setTransactionType(type);
  }, []);

  const toggleSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(oldState => !oldState);
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

          <CategorySelectButton
            title={category.name}
            activeOpacity={0.7}
            onPress={toggleSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={toggleSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};

export { Register };
