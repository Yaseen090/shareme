import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import {Login} from './components';
import Home from './containers/Home';
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='category/Animals' element={<Home />} />

      <Route path='*' element={<Home />} />

    </Routes>
    </div>
  );
}

export default App;
