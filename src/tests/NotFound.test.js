import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se a página contém um heading h2', () => {
  renderWithRouter(<NotFound />);

  const notFound = screen.getByRole(
    'heading', { name: /Page requested not found Crying emoji/i, level: 2 },
  );
  const img = screen.getByRole('img',
    { name: /Pikachu crying because the page requested was not found/i });

  expect(notFound).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
