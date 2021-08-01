import React, { useCallback, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';

import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  LoadContainer,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';

interface ITransactionProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

const Resume: React.FC = () => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    [],
  );

  const handleDateChange = useCallback(
    (action: 'next' | 'previous') => {
      if (action === 'next') {
        setSelectedDate(addMonths(selectedDate, 1));
      } else {
        setSelectedDate(subMonths(selectedDate, 1));
      }
    },
    [selectedDate],
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const dataKey = '@gofinances:transactions';

      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      // const expensive = responseFormatted.filter(
      //   (transaction: ITransactionProps) => transaction.type === 'negative',
      // );

      const transactions = responseFormatted.filter(
        (transaction: ITransactionProps) =>
          new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            selectedDate.getFullYear(),
      );

      const categoryTotal = transactions.reduce(
        (accumulator: number, transaction: ITransactionProps) => {
          return accumulator + Number(transaction.amount);
        },
        0,
      );

      const totalByCategory: ICategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        transactions.forEach((expensiveItem: ITransactionProps) => {
          if (expensiveItem.category === category.key) {
            categorySum += Number(expensiveItem.amount);
          }
        });

        if (categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const percent = `${((categorySum / categoryTotal) * 100).toFixed(
            0,
          )}%`;

          totalByCategory.push({
            key: category.key,
            name: category.name,
            total: categorySum,
            totalFormatted,
            color: category.color,
            percent,
          });
        }
      });

      setTotalByCategories(totalByCategory);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Não foi possível obter as informações');
    }
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <MonthSelect>
        <MonthSelectButton onPress={() => handleDateChange('previous')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleDateChange('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Content showsVerticalScrollIndicator={false}>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={90}
                x="percent"
                y="total"
              />
            </ChartContainer>

            {totalByCategories.map(totalCategory => (
              <HistoryCard
                key={totalCategory.key}
                title={totalCategory.name}
                amount={totalCategory.totalFormatted}
                color={totalCategory.color}
              />
            ))}
          </Content>
        </>
      )}
    </Container>
  );
};

export { Resume };
