import React from 'react';

import { Container, Title, Amount } from './styles';

interface IProps {
  title: string;
  amount: string;
  color: string;
}

const HistoryCard: React.FC<IProps> = ({ title, amount, color }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export { HistoryCard };
