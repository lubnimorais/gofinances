import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';

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

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-self: center;
`;

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + RFValue(10)
    : 28}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top: ${RFValue(-7)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  contentContainerStyle: { paddingLeft: 14 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;

  position: absolute;
  margin-top: ${Platform.OS === 'ios' ? RFPercentage(17) : RFPercentage(17)}px;
`;

export const Transactions = styled.View`
  flex: 1;

  padding: 0 24px;
  margin-top: ${RFPercentage(9)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<ITransactionCardProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 10,
  },
})``;
