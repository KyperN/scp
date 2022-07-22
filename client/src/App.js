import './App.css';
import { useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Navigate, Route, Routes } from 'react-router';
import Home from './components/Home/Home';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Main from './components/Main/Main';
function App() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className="App">
      <p className="title">Welcom to TODO App</p>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/tasks"
          element={userName === '' ? <Navigate to="/" /> : <Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
