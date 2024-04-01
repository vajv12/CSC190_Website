//test all nav bar links, part 2 (had to split these into 3 files. Otherwise they would start failing for some reason)
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App'; 

// jest.setTimeout(13000); // Set timeout to 13000 milliseconds for all tests in this file
afterEach(() => {
  jest.resetModules();
});

test('finds "Private Rooms" link and navigates to Private Room Reservations page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/PrivateRooms"]');
  //simulate clicking the selected link
  await user.click(navlink);

  const testElement = await screen.findByTestId('private-rooms-page');
  expect(testElement).toBeInTheDocument();
});

test('finds "About" link and navigates to About Us page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/About"]');
  //simulate clicking the selected link
  await user.click(navlink);
  
  //check if an element with a matching TestId/Datatag is loaded
  const testElement = await screen.findByTestId('about-page');
  expect(testElement).toBeInTheDocument();
});

test('finds "Contact" link and navigates to Contact page', async () => {
  render(<App />);
  const user = userEvent.setup();
  //select the link by querying the page
  const navlink = document.querySelector('a[href="/pages/Contact"]');
  //simulate clicking the selected link
  await user.click(navlink);
  
  //check if an element with a matching TestId/Datatag is loaded
  await (waitFor(() => {
      const testElement = screen.getByTestId('contact-page');
      expect(testElement).toBeInTheDocument();
    }, 
    { timeout: 13000 }
  ));
});

