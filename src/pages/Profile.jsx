import React, { useState, useEffect } from 'react';
// Import any additional libraries or styles here

function Profile() {
  // Example user data, you might fetch this from an API or context
  const [userData, setUserData] = useState({
    name: 'John Doe',
    profilePictureUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    tournaments: [] // This would be populated with tournament data
  });

  // Simulate fetching user data on component mount
  useEffect(() => {
    // Fetch user data here and update state
    // For now, userData is statically set
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <img src={userData.profilePictureUrl} alt="Profile" />
        <h2>{userData.name}</h2>
      </div>
      <div className="tournaments-table">
        <h3>Tournaments</h3>
        <table>
          <thead>
            <tr>
              <th>Tournament Name</th>
              <th>Date</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over tournaments to display each one */}
            {userData.tournaments.length > 0 ? (
              userData.tournaments.map((tournament, index) => (
                <tr key={index}>
                  <td>{tournament.name}</td>
                  <td>{tournament.date}</td>
                  <td>{tournament.position}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tournaments to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
