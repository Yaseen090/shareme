import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import {Login} from './components';
import Home from './containers/Home';
import { useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';
const App = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const user = fetchUser();
    console.log(user)
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <div>
    <Routes>
      <Route path='login' element={<Login />} />

      <Route path='*' element={<Home />} />

    </Routes>
    </div>
  );
}

export default App;
