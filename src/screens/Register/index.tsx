import React, { useState, useCallback } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
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

interface IFormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor obrigatório'),
});

const Register: React.FC = () => {
  const navigation = useNavigation();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState<ICategory>({
    key: 'category',
    name: 'Categoria',
  });

  const toggleSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(oldState => !oldState);
  }, []);

  const handleTransactionTypeSelect = useCallback(
    (type: 'positive' | 'negative') => {
      setTransactionType(type);
    },
    [],
  );

  const handleRegister = useCallback(
    async (data: IFormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação');

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria');

      const newTransaction = {
        id: String(uuid.v4()),
        name: data.name,
        amount: data.amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      };

      try {
        const dataKey = '@gofinances:transactions';

        const response = await AsyncStorage.getItem(dataKey);
        const currentData = response ? JSON.parse(response) : [];

        const dataFormatted = [...currentData, newTransaction];

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        reset();
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'Categoria',
        });

        navigation.navigate('Dashboard');
      } catch (error) {
        Alert.alert('Não foi possível salvar');
      }
    },
    [category.key, transactionType, reset, navigation],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionType>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelect('positive')}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelect('negative')}
              />
            </TransactionType>

            <CategorySelectButton
              title={category.name}
              activeOpacity={0.7}
              onPress={toggleSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            activeOpacity={0.7}
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={toggleSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export { Register };
