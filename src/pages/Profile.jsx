import React, { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseContext } from '../FirebaseContext';
import '../styles/Profile.css';

function Profile() {
  const { db } = useContext(FirebaseContext);
  const [userData, setUserData] = useState({
    name: '',
    profilePictureUrl: '',
    aboutMe: '', // New field for About Me
    age: '', // New field for Age
    reservations: [], // New field for Reservations
    tournaments: []
  });
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    });
    return () => unsubscribe();
  }, [db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For handling arrays (like reservations), you may need additional logic
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const saveUserData = async () => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    try {
      await setDoc(userDocRef, userData, { merge: true });
      setEditMode(false);
    } catch (error) {
      console.error("Error setting document: ", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        {editMode ? (
          <>
          <p>ImageURL:</p>
            <input type="text" name="profilePictureUrl" value={userData.profilePictureUrl} onChange={handleInputChange} placeholder="Profile Picture URL" />
            <p>Name:</p>
            <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Name" />
            <p>About Me:</p>
            <textarea name="aboutMe" value={userData.aboutMe} onChange={handleInputChange} placeholder="About Me"></textarea>
            <p>Age:</p>
            <input type="number" name="age" value={userData.age} onChange={handleInputChange} placeholder="Age" />
            {/* For Reservations, you might need a more complex UI, like a list of inputs or a date picker */}
          </>
        ) : (
          <>
            <img src={userData.profilePictureUrl || 'default-profile-picture-url'} alt="Profile" />
            <h2>{userData.name || 'Anonymous'}</h2>
            <p>About Me: {userData.aboutMe || 'N/A'}</p>
            <p>Age: {userData.age || 'N/A'}</p>
            {/* Display reservations, if any */}
          </>
        )}
        {!editMode && (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
      {editMode && <button onClick={saveUserData}>Save</button>}
      <div className="tournaments-table">
        {/* Tournament table JSX */}
      </div>
    </div>
  );
}

export default Profile;
