import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes para a página da Carteira', () => {
  test('Testa se a carteira está na rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verifica se existe o formulário de adicionar despesa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  test('Verifica se é possível adicionar despesas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addBtn = screen.getByText(/adicionar despesa/i);

    userEvent.type(value, '30');
    userEvent.type(description, 'Bk Wooper');
    userEvent.click(addBtn);

    const tableBoddy = screen.getByTestId('table-body');

    expect(tableBoddy).toBeInTheDocument();
  });
});
