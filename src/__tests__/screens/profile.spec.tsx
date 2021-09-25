import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
  it('should have placeholder correctly in user name input', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it('should be load user date', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Lubni');
    expect(inputSurname.props.value).toEqual('Morais');
  });

  it('should exists title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
