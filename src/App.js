import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar.jsx/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import {Video} from './Pages/Video/Video';
import { useState } from 'react';
function App() {
  const[sidebar, setsidebar] = useState(false);
  return (
    <div className="App">
     <Navbar setsidebar={setsidebar}/>
     <Routes>
      <Route path='/' element={<Home sidebar={sidebar}/>}/>
      <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
     </Routes>
    </div>
  );
}

export default App;
