import React from 'react';

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

interface ICategory {
  name: string;
  icon: string;
}

interface ITransactionCardProps {
  id: string;
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

interface IProps {
  data: ITransactionCardProps;
}

const TransactionCard: React.FC<IProps> = ({ data }) => {
  const { type, title, amount, category, date } = data;

  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};

export { TransactionCard };
