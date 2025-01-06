import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMemberForm from './pages/AddMemberForm/AddMemberForm';
import MemberProfile from './pages/MemberProfile/MemberProfile';
import MembersList from './pages/MembersList/MembersList';
import './index.css';

function App() {
  return (

    <div className="App">
    <Router>
      <Routes>
      <Route path="/members/:memberId" element={<MemberProfile />} />
      <Route path="/members" element={<MembersList />} />
      <Route path="/members/create" element={<AddMemberForm />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;

