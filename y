rules_version = '2';

// Allow read/write access to all users under any conditions
// Warning: **NEVER** use this rule set in production; it allows
// anyone to overwrite your entire database.
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
       allow read, write: if request.time < timestamp.date(2024, 3, 22);
    }
      // Allow anyone to read from the "contacts" collection
    match /contacts/{document} {
      allow read;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
  }
}