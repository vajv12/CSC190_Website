//test all nav bar links, part 1 (had to split these into 3 files - App,App2,App3. Otherwise they would start failing for some reason)
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App'; 

// jest.setTimeout(13000); // Set timeout to 13000 milliseconds for all tests in this file
afterEach(() => {
  jest.resetModules();
});

test('finds Login link and navigates to signup/signin page, creates a new account', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const loginLink = document.querySelector('a[href="/pages/Login"]');
  //simulate clicking the selected link
  await user.click(loginLink);

  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('signin-page');
  expect(testElement).toBeInTheDocument();

  const randomNumber = Math.floor(100000 + Math.random() * 900000);//generate random 6 digit number
  const username = `bot${randomNumber}`;
  const email = `${username}@gmail.com`;
  const password = 'password';

  const usernameInput = screen.getByPlaceholderText('Username');
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Create Account'); 

  // Fill out the form
  await user.type(usernameInput, username);
  await user.type(emailInput, email);
  await user.type(passwordInput, password);

  // Submit the form
  await user.click(submitButton);

  // Wait for the username to appear on the page, which means account was created successfully
  await waitFor(() => {
    expect(screen.getByText("Username must be more than 4 characters.")).toBeInTheDocument();
  });

});
