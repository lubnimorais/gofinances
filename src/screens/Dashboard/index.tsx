import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../hooks/auth';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  LoadContainer,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

interface ITransactionCardProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: IHighlightProps;
  expensive: IHighlightProps;
  total: IHighlightProps;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { user, signOut } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransactionCardProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData,
  );

  const getLastTransactionDate = useCallback(
    (collection: ITransactionCardProps[], type: 'positive' | 'negative') => {
      const collectionFiltered = collection.filter(
        transaction => transaction.type === type,
      );

      if (collectionFiltered.length === 0) {
        return 0;
      }

      const lastTransactions = new Date(
        Math.max.apply(
          Math,
          collectionFiltered.map(transaction =>
            new Date(transaction.date).getTime(),
          ),
        ),
      );

      return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString(
        'pt-BR',
        {
          month: 'long',
        },
      )}`;
    },
    [],
  );

  const loadTransactions = useCallback(async () => {
    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactionsResponse = response ? JSON.parse(response) : [];

      let entriesSum = 0;
      let expensiveSum = 0;

      const transactionsFormatted: ITransactionCardProps[] =
        transactionsResponse.map((item: ITransactionCardProps) => {
          if (item.type === 'positive') {
            entriesSum += Number(item.amount);
          } else {
            expensiveSum += Number(item.amount);
          }

          const amount = Number(item.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date));

          return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
          };
        });

      setTransactions(transactionsFormatted);

      const lastTransactionEntries = getLastTransactionDate(
        transactionsResponse,
        'positive',
      );
      const lastTransactionExpensive = getLastTransactionDate(
        transactionsResponse,
        'negative',
      );
      const totalInterval =
        lastTransactionExpensive === 0
          ? 'N??o h?? transa????es'
          : `01 ?? ${lastTransactionExpensive}`;

      const total = entriesSum - expensiveSum;

      setHighlightData({
        entries: {
          amount: entriesSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction:
            lastTransactionEntries === 0
              ? 'N??o h?? transa????es'
              : `??ltima entrada dia ${lastTransactionEntries}`,
        },
        expensive: {
          amount: expensiveSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction:
            lastTransactionExpensive === 0
              ? 'N??o h?? transa????es'
              : `??ltima sa??da dia ${lastTransactionExpensive}`,
        },
        total: {
          amount: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: totalInterval,
        },
      });

      setIsLoading(false);
    } catch (error) {
      Alert.alert('N??o foi poss??vel carregar os dados');
    }
  }, [getLastTransactionDate, dataKey]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions]),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Ol??,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Sa??das"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export { Dashboard };
