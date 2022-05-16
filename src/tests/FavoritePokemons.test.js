import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);
  const noFav = screen.getByText(/no favorite pokemon found/i);
  expect(noFav).toBeInTheDocument();
});

test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);
  const clickDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(clickDetails);
  const clickFav = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  userEvent.click(clickFav);
  const goToFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(goToFav);
  const pokFav = screen.getByText(/pikachu/i);
  expect(pokFav).toBeInTheDocument();
});
