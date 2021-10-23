import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import iconImg from '../../assets/icon.png';

import { Container } from './styles';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Container>
      <Image source={iconImg} resizeMode="center" />
    </Container>
  );
};

export { Splash };
