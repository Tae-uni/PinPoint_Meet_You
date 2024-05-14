import React from 'react';
import MapComponent from './MapComponent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageSet1 from './PageSet1.jsx';
import PageSet2 from './PageSet2.jsx';
import PageSet3 from './PageSet3.jsx';
import PageSet4 from './PageSet4.jsx';
import PageSet5 from './PageSet5.jsx';
import PageSet6 from './PageSet6.jsx';
import PageSet7 from './PageSet7.jsx';
import PageSet8 from './PageSet8.jsx';
import PageSet9 from './PageSet9.jsx';
import PageGet1 from './PageGet1.jsx';
import MapComponent2 from './MapComponent2.jsx';
import UserPageGet1 from './UserPageGet1.jsx';
import Login from './Login.jsx';
import SignUp from './Signup.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/web" element={<MapComponent />} />
        <Route path="/web2" element={<MapComponent2 />} />
        <Route path="/" element={<Login />} />
        <Route path='/web/Signup' element={<SignUp />} />
        <Route path="/web/PageSet1" element={<PageSet1 />} />
        <Route path='/web/PageGet1' element={<PageGet1 />} />
        <Route path='/web/UserPageGet1' element={<UserPageGet1 />} />
        <Route path="/web/PageSet2" element={<PageSet2 />} />
        <Route path="/web/PageSet3" element={<PageSet3 />} />
        <Route path="/web/PageSet4" element={<PageSet4 />} />
        <Route path="/web/PageSet5" element={<PageSet5 />} />
        <Route path="/web/PageSet6" element={<PageSet6 />} />
        <Route path="/web/PageSet7" element={<PageSet7 />} />
        <Route path="/web/PageSet8" element={<PageSet8 />} />
        <Route path="/web/PageSet9" element={<PageSet9 />} />
      </Routes>
    </Router>
  );
}

export default App;
