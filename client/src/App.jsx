import React from 'react';
import MapComponent from './MapComponent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageSet from './components/PageSet/PageSet.jsx';
import PageGet from './components/PageGet/PageGet.jsx';
import MapComponent2 from './MapComponent2.jsx';
import UserPageGet from './UserPageGet.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/Signup/Signup.jsx';
import UpdateGroup from './components/UpdateGroup/UpdateGroup.jsx';
import StartPage from './components/StartPage/StartPage.jsx';
import ReviewGet from './ReviewGet.jsx';
import ReviewPage from './ReviewPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path="/web" element={<MapComponent />} />
        <Route path="/web2" element={<MapComponent2 />} />
        <Route path="/login" element={<Login />} />
        <Route path='/web/Signup' element={<SignUp />} />
        <Route path="/web/PageSet/:placeName" element={<PageSet />} />
        <Route path="/web/PageGet/:placeName" element={<PageGet />} />
        <Route path='/groups/:groupId/edit' element={<UpdateGroup />} />
        <Route path="/web/UserPageGet/:placeName" element={<UserPageGet />} />
        <Route path='/web/ReviewPage' element={<ReviewPage/>} />
        <Route path='/web/ReviewGet' element={<ReviewGet/>} />
      </Routes> 
    </Router>
  );
}

export default App;
