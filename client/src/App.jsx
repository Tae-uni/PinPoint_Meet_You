import React from 'react';
import MapComponent from './MapComponent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageSet from './components/PageSet/PageSet.jsx';
import PageGet from './components/PageGet/PageGet.jsx';
import MapComponent2 from './MapComponent2.jsx';
import UserPageGet1 from './UserPageGet1.jsx';
import Login from './Login.jsx';
import SignUp from './Signup.jsx';
import UpdateGroup from './components/UpdateGroup/UpdateGroup.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/web" element={<MapComponent />} />
        <Route path="/web2" element={<MapComponent2 />} />
        <Route path="/" element={<Login />} />
        <Route path='/web/Signup' element={<SignUp />} />
        <Route path='/web/UserPageGet1' element={<UserPageGet1 />} />
        <Route path="/web/PageSet/:placeName" element={<PageSet />} />
        <Route path="/web/PageGet/:placeName" element={<PageGet />} />
        <Route path='/groups/:groupId/edit' element={<UpdateGroup />} />
      </Routes> 
    </Router>
  );
}

export default App;
