import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Teste se a página contém um heading h2 ', () => {
  renderWithRouter(<App />);
  const pageHeading = screen.findByRole('heading',
    { name: /Encountered pokémons/i, level: 2 });
  expect(pageHeading).toBeDefined();
});

test('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
  renderWithRouter(<App />);
  const btn = screen.getByRole('button', { name: /próximo pokémon/i });
  pokemons.forEach((elem) => {
    userEvent.click(btn);
    expect(pokemons).toContain(elem);
  });
});

test('Teste se é mostrado apenas um pokémon por vez.', () => {
  renderWithRouter(<App />);
  const firstPokemon = screen.getByText(/pikachu/i);
  expect(firstPokemon).toBeInTheDocument();
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  pokemons.forEach((elem) => {
    const btn = screen.getByRole('button', { name: elem.type });
    userEvent.click(btn);
    pokemons.filter((ele) => ele.type === elem.type).forEach((ev) => {
      const proxBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(proxBtn);
      const type = screen.getAllByText(ev.type);
      const all = screen.getByRole('button', { name: /all/i });
      expect(all).toBeDefined();
      expect(type).toBeDefined();
      expect(type).toHaveLength(2);
    });
  });
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const btnType1 = screen.getByRole('button', { name: /fire/i });
  userEvent.click(btnType1);
  const type = screen.getAllByText(/fire/i);
  expect(type).toBeDefined();
  expect(type).toHaveLength(2);
  const all = screen.getByRole('button', { name: /all/i });
  userEvent.click(all);
  const btnType2 = screen.getAllByText(/electric/i);
  expect(btnType2).toBeDefined();
  expect(btnType2).toHaveLength(2);
});
