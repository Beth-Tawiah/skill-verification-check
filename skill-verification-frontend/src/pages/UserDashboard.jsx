import React, { useState } from 'react';

function UserDashboard() {
  const [skills, setSkills] = useState('');
  const [certificates, setCertificates] = useState('');
  const [education, setEducation] = useState('');
  const [training, setTraining] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the data to your smart contract or API here
    console.log('Skills:', skills);
    console.log('Certificates:', certificates);
    console.log('Education:', education);
    console.log('Training:', training);
    // Reset the form fields
    setSkills('');
    setCertificates('');
    setEducation('');
    setTraining('');
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Add Skills:
          <input type="text" value={skills} onChange={handleSkillsChange} />
        </label>
        <br />
        <label>
          Add Certificates:
          <input type="text" value={certificates} onChange={handleCertificatesChange} />
        </label>
        <br />
        <label>
          Add Educational Background:
          <input type="text" value={education} onChange={handleEducationChange} />
        </label>
        <br />
        <label>
          Add Completed Training:
          <input type="text" value={training} onChange={handleTrainingChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserDashboard;
