import React, { useCallback } from 'react';
import { categories } from '../../utils/categories';

import { Button } from '../../components/Form/Button';

import {
  Container,
  Header,
  Title,
  ListCategories,
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
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<IProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleCategorySelect = useCallback(
    (categorySelect: ICategory) => {
      setCategory(categorySelect);
    },
    [setCategory],
  );

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <ListCategories
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectCategory}
          activeOpacity={0.7}
        />
      </Footer>
    </Container>
  );
};

export { CategorySelect };
