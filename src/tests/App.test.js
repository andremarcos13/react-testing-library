import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: /home/i });
  const linkAbout = screen.getByRole('link', { name: /about/i });
  const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada ao clicar no link home', () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: /home/i });
  expect(linkHome).toBeInTheDocument();
  userEvent.click(linkHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada ao clicar no link about', () => {
  const { history } = renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /about/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada ao clicar no link favorite', () => {
  const { history } = renderWithRouter(<App />);
  const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkFavorite).toBeInTheDocument();
  userEvent.click(linkFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/asdadsa');
  const notFound = screen.getByRole('heading', { name: 'Page requested not found 😭' });
  expect(notFound).toBeInTheDocument();
});
