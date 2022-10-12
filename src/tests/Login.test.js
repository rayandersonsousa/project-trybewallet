import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailId = 'email-input';
const passId = 'password-input';

describe('Testes para a página de Login', () => {
  test('Testa se o componente Login está na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se os campos de logine botão enviar existem na tela', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const loginBtn = screen.getByText(/entrar/i);
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('Verifica se o botão entrar está desabilitado caso email seja inválido', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const loginBtn = screen.getByText(/entrar/i);
    userEvent.type(emailInput, 'emailinvalido.com');
    userEvent.type(passInput, '123456');
    expect(loginBtn).toBeDisabled();
  });

  test('Verifica se o botão entrar está desabilitado caso senha seja inválida', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const loginBtn = screen.getByText(/entrar/i);
    userEvent.type(emailInput, 'rogerinho@inga.com.br');
    userEvent.type(passInput, '12345');
    expect(loginBtn).toBeDisabled();
  });

  test('Verifica se ao fazer o login, a pagina redireciona para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const loginBtn = screen.getByText(/entrar/i);
    userEvent.type(emailInput, 'rogerinho@inga.com.br');
    userEvent.type(passInput, '123456');
    userEvent.click(loginBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
