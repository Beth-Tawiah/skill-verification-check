import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
// import UserDashboard from './pages/UserDashboard';
// import VerificationPage from './components/VerificationPage';
// import EmployersPage from './components/EmployersPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/login" pages={Login} />
          {/* <Route path="/dashboard" pages={UserDashboard} /> */}
          {/* <Route path="/verification" component={VerificationPage} /> */}
          {/* <Route path="/employers" component={EmployersPage} /> */}
          {/* You can add more routes for other pages if needed */}
      </Router>
    </div>
  );
}

export default App;
