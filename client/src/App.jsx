import React from 'react';
import MapComponent from './MapComponent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import PageSet1 from './PageSet1.jsx';
import PageSet2 from './PageSet2.jsx';
import PageSet3 from './PageSet3.jsx';
import PageSet4 from './PageSet4.jsx';
import PageSet5 from './PageSet5.jsx';
import PageSet6 from './PageSet6.jsx';
import PageSet7 from './PageSet7.jsx';
import PageSet8 from './PageSet8.jsx';
import PageSet9 from './PageSet9.jsx';
import PageGet1 from './PageGet1.jsx';*/
import PageSet from './components/PageSet/PageSet.jsx';
import PageGet from './components/PageGet/PageGet.jsx';
import MapComponent2 from './MapComponent2.jsx';
import UserPageGet1 from './UserPageGet1.jsx';
import Login from './Login.jsx';
import SignUp from './Signup.jsx';
//import GroupDetail from './components/GroupDetail/GroupDetail.jsx';

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
      </Routes> 
    </Router>
  );
}

export default App;
