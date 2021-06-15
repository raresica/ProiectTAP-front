import { render, screen } from '@testing-library/react';
import GenreList from './GenreList';

test('renders learn react link', () => {
  render(<GenreList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
