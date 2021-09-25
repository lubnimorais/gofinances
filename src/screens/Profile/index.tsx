import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Lubni"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Morais"
      />

      <Button
        title="Salvar"
        onPress={() => {
          console.log('botao');
        }}
      />
    </View>
  );
};

export { Profile };
