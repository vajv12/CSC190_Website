// reportWebVitals.test.js
import reportWebVitals from '../../../reportWebVitals.js';

// Mock for the web vitals functions
const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

// Mock the dynamic import of 'web-vitals'
jest.mock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB
}), { virtual: true });

describe('reportWebVitals', () => {
  it('does not call web vitals functions when no function is passed', async () => {
    reportWebVitals(null);

    // Wait for the promises to resolve
    await new Promise(process.nextTick);

    // Check that the web vitals functions were not called
    expect(mockGetCLS).not.toHaveBeenCalled();
    expect(mockGetFID).not.toHaveBeenCalled();
    expect(mockGetFCP).not.toHaveBeenCalled();
    expect(mockGetLCP).not.toHaveBeenCalled();
    expect(mockGetTTFB).not.toHaveBeenCalled();
  });
});
