import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { RFValue } from 'react-native-responsive-fontsize';

import { Feather } from '@expo/vector-icons';

interface IContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

interface IIconType {
  type: 'up' | 'down';
}

export const Container = styled.View<IContainerProps>`
  width: 48%;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ theme, isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${theme.colors.success_light};
    `}

  ${({ theme, isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IIconType>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};

  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
