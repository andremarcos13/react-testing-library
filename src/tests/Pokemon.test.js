import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getAllByTestId('pokemon-name');
  expect(pokemonName[0]).toHaveTextContent('Pikachu');
  const pokemonType = screen.getAllByTestId('pokemon-type');
  expect(pokemonType[0]).toHaveTextContent('Electric');
  const pokemonWeight = screen.getAllByTestId('pokemon-weight');
  expect(pokemonWeight[0]).toHaveTextContent('Average weight: 6.0 kg');
  const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste se o card do pokémon na Pokédex contém um link', () => {
  const { history } = renderWithRouter(<App />);
  const pokemon = screen.getAllByTestId('pokemon-name');
  expect(pokemon[0]).toHaveTextContent('Pikachu');
  const desc = screen.getByRole('link', { name: 'More details' });
  expect(desc).toBeInTheDocument();
  userEvent.click(desc);
  const path = history.location.pathname;
  expect(path).toBe('/pokemons/25');
  const pokeDesc = screen.getByRole('heading', { name: 'Pikachu Details' });
  expect(pokeDesc).toBeInTheDocument();
});

test('este se existe um ícone de estrela nos pokémons favoritados.', () => {
  const { history } = renderWithRouter(<App />);
  const moreDet = screen.getByRole('link', { name: 'More details' });
  expect(moreDet).toBeInTheDocument();
  userEvent.click(moreDet);
  const path = history.location.pathname;
  expect(path).toBe('/pokemons/25');
  const favPoke = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(favPoke);
  const fav = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(fav).toBeInTheDocument();
  expect(fav.src).toBe('http://localhost/star-icon.svg');
});
