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

function App() {
  const [authed, setAuthed] = useState(false);
  const [onAuth, setOnAuth] = useState(false);

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
      {!onAuth && <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute authed={authed} path="profile"/>}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="/login/:redirect" element={<Login authed={authed}/>} />
        </Routes>
      </BrowserRouter>}
      </>
  );
}

export default App;
