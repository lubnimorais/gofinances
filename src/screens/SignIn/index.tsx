import React, { useCallback, useState } from 'react';
import { Alert, ActivityIndicator, Platform } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

const SignIn: React.FC = () => {
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }, [signInWithGoogle]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }, [signInWithApple]);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
};

export { SignIn };
