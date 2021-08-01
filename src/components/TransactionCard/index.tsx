import React from 'react';

import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface ITransactionCardProps {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface IProps {
  data: ITransactionCardProps;
}

const TransactionCard: React.FC<IProps> = ({ data }) => {
  const { type, name, amount, category, date } = data;

  const cat = categories.find(c => c.key === category);

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={cat?.icon} />
          <CategoryName>{cat?.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};

export { TransactionCard };
