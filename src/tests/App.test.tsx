import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { BrowserRouter, MemoryRouter } from "react-router-dom";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("app renders", () => {
  render(<App />, {wrapper: BrowserRouter});
  const appComponent: HTMLElement = screen.getByTestId("appComponent");
  const homeComponent: HTMLElement = screen.getByTestId("homeComponent");

  expect(appComponent).toBeInTheDocument();
  expect(homeComponent).toBeInTheDocument();
});

test("bad route test", async () => {
  const route = "/some-route-that-doesn't-exist";

  render(
    <MemoryRouter initialEntries={[route]} >
      <App />
    </MemoryRouter>
  );

  const routingErrorComponent: HTMLElement = screen.getByTestId("routingErrorComponent");
  expect(routingErrorComponent).toBeInTheDocument();
});

test("home route test", async () => {
  const route = "/";

  render(
    <MemoryRouter initialEntries={[route]} >
      <App />
    </MemoryRouter>
  );

  const homeComponent: HTMLElement = screen.getByTestId("homeComponent");
  expect(homeComponent).toBeInTheDocument();
});
