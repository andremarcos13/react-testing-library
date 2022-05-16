import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const pageTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(pageTitle).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const firstP = screen.getByText(/This application simulates a Pokédex/i);
  const secondP = screen.getByText(/One can filter Pokémons by type/i);
  expect(firstP).toBeInTheDocument();
  expect(secondP).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
  renderWithRouter(<About />);
  const img = screen.getByRole('img', { name: 'Pokédex' });
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
