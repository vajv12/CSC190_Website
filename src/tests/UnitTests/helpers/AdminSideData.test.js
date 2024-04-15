import { AdminSideData } from '../../../helpers/AdminSideData';  // Adjust the path as needed
import React from 'react';

describe('AdminSideData', () => {
  it('contains valid navigation data', () => {
    expect(Array.isArray(AdminSideData)).toBeTruthy();
    expect(AdminSideData.length).toBeGreaterThan(0);  // Ensures there is data

    AdminSideData.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('link');

      // Validate data types
      expect(typeof item.title).toBe('string');
      expect(React.isValidElement(item.icon)).toBeTruthy();
      expect(typeof item.link).toBe('string');

      // Test for specific values
      expect(item.link).toMatch(/^\/pages\/Home$|^\/admin\/Adproduct$/); // Ensure links are as expected
    });
  });
});
