import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Feather } from '@expo/vector-icons';

interface IContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

interface IIconType {
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

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
