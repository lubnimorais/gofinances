import React from 'react';
import { categories } from '../../utils/categories';

import { Button } from '../../components/Form/Button';

import {
  Container,
  Header,
  Title,
  Lista,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface IProps {
  category: string;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<IProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <Lista
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  );
};

export { CategorySelect };
