import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<ITypeProps>`
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px 23px;
  margin-right: 16px;

  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<ITypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ theme, type }) =>
    type === 'up' &&
    css`
      color: ${theme.colors.success};
    `}

  ${({ theme, type }) =>
    type === 'down' &&
    css`
      color: ${theme.colors.attention};
    `}

  ${({ theme, type }) =>
    type === 'total' &&
    css`
      color: ${theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};

  margin-top: 38px;
`;

export const LastTransaction = styled.Text<ITypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};

  margin-top: ${RFValue(-7)}px;
`;
