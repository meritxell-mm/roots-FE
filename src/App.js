/*import React from 'react';
import MemberProfile from './components/MemberProfile/MemberProfile';

function App() {
  return (
    <div className="App">
      
      <MemberProfile memberId={1} />
    </div>
  );
}

export default App;
*/
/*import React from 'react';
import './App.css';
import MemberList from './components/MemberList';
import MemberProfile from './components/MemberProfile/MemberProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LA Família</h1>
      </header>
      <MemberProfile />
    </div>
  );
}

export default App;*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMemberForm from './components/AddMemberForm/AddMemberForm';
import MemberProfile from './components/MemberProfile/MemberProfile';
import MembersList from './components/MembersList';
import './styles.css';

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

