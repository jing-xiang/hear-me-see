import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // Renders App component 
  render(<App />);
  // Find element containing 'learn react'
  const linkElement = screen.getByText(/learn react/i);
  // Assertion that element is in the document
  expect(linkElement).toBeInTheDocument();
});
