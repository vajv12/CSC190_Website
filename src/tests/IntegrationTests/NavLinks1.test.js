//test all nav bar links, part 1 (had to split these into 3 files. Otherwise they would start failing for some reason)
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App'; 

// jest.setTimeout(13000); // Set timeout to 13000 milliseconds for all tests in this file
// afterEach(() => {
//   jest.resetModules();
// });

test('finds Login link and navigates to signup/signin page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const loginLink = document.querySelector('a[href="/pages/Login"]');
  //simulate clicking the selected link
  await user.click(loginLink);

  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('signin-page');
  expect(testElement).toBeInTheDocument();
});

test('finds "Home" link and navigates to home page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Home"]');
  //simulate clicking the selected link
  await user.click(navlink);

  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('home-page');
  expect(testElement).toBeInTheDocument();
});

test('finds "Products" link and navigates to product page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Product"]');
  //simulate clicking the selected link
  await user.click(navlink);

  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('products-page');
  expect(testElement).toBeInTheDocument();
});
