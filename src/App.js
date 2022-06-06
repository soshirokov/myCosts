import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './Routes/Home';
import { Profile } from './Routes/Profile';
import { Login } from './Routes/Login';
import { PrivateRoute } from './Helpers/PivateRoutes';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Helpers/Firebase';
import PersistentDrawerLeft from './Templates/PersistentDrawerLeft';

function App() {
  const [authed, setAuthed] = useState(false);
  const [onAuth, setOnAuth] = useState(false);
  const menu = [
    {title: 'Home', link: '/'},
    {title: 'Pofile', link: '/profile'}
  ];

  useEffect(()=>{
    setOnAuth(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
        setOnAuth(false);
      } else {
        setAuthed(false);
        setOnAuth(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
      <>
      <BrowserRouter>
        <PersistentDrawerLeft menu={menu}>
        {!onAuth && 
        
          <Routes>
            <Route path="/" element={<PrivateRoute authed={authed}/>}>
              <Route path="" element={<Home />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute authed={authed} path="profile"/>}>
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login authed={authed}/>}>
              <Route path="redirect/:redirect" element={<Login authed={authed}/>} />
            </Route>
          </Routes>
        }
        </PersistentDrawerLeft>
      </BrowserRouter>
      </>
  );
}

export default App;
