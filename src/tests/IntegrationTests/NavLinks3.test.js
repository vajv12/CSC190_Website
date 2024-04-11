//test all nav bar links, part 1 (had to split these into 3 files. Otherwise they would start failing for some reason)
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App'; 

// jest.setTimeout(13000); // Set timeout to 13000 milliseconds for all tests in this file
afterEach(() => {
  jest.resetModules();
});

test('finds "Events" link and navigates to calendar page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Calendar"]');
  //simulate clicking the selected link
  await user.click(navlink);

  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('events-page');
  expect(testElement).toBeInTheDocument();
});

test('finds "Events->Sacramento" link and navigates to Sacramento Event Calendar page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Sacramento"]');
  //simulate clicking the selected link
  await user.click(navlink);

  const testElement = await screen.findByTestId('sac');
  expect(testElement).toBeInTheDocument();
});

test('finds "Events->Rocklin" link and navigates to Rocklin Event Calendar page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Rocklin"]');
  //simulate clicking the selected link
  await user.click(navlink);

  const testElement = await screen.findByTestId('rocklin-page');
  expect(testElement).toBeInTheDocument();
});
