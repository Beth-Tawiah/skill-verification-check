import React, { useState } from 'react';
import './UserDashboard.css';
import { issueCredential } from './blockchain.js';

function UserDashboard() {
  const [skills, setSkills] = useState('');
  const [certificates, setCertificates] = useState('');
  const [education, setEducation] = useState('');
  const [training, setTraining] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const handleCertificatesChange = (e) => {
    setCertificates(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleTrainingChange = (e) => {
    setTraining(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the notification
    setShowNotification(true);

    // Simulate a delay to show the notification
    setTimeout(async () => {
      // Call the smart contract function to issue a credential
      await issueCredential(skills, certificates);

      // Reset the form fields
      setSkills('');
      setCertificates('');
      setEducation('');
      setTraining('');

      // Hide the notification after the verification is complete
      setShowNotification(false);
    }, 2000); // Simulating a 2-second delay for verification
  };
  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-title">User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={handleSkillsChange}
            placeholder="Enter your skills"
          />
        </div>

        <div className="form-group">
          <label htmlFor="certificates">Certificates:</label>
          <input
            type="text"
            id="certificates"
            value={certificates}
            onChange={handleCertificatesChange}
            placeholder="Add your certificates"
          />
        </div>

        <div className="form-group">
          <label htmlFor="education">Educational Background:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={handleEducationChange}
            placeholder="Add your education details"
          />
        </div>

        <div className="form-group">
          <label htmlFor="training">Completed Training:</label>
          <input
            type="text"
            id="training"
            value={training}
            onChange={handleTrainingChange}
            placeholder="Add completed training"
          />
<button type="submit" className="submit-button">
  Submit
  
</button>

{showNotification && (
  <div className="notification-popup">Skills verification in progress</div>
)}

        </div>
      </form>
    </div>
  );
}

export default UserDashboard;
