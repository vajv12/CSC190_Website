import { db, auth, analytics } from '../../firebaseSetup.js';

describe('Real Firebase Initialization', () => {
  it('should have Firebase services initialized', () => {
    expect(db).toBeDefined();
    expect(auth).toBeDefined();
    expect(analytics).toBeDefined();
  });
});