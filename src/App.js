import './App.css';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {
  const {isAuthtoken,setIsAuthtoken} = useContext(isAuthTokenContext)
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/login' element={<Authentication/>}/>

        <Route path='/dashboard' element={isAuthtoken?<Dashboard dashboard />:<Home/>}/>

        <Route path='/register' element={<Authentication register/>}/>

        <Route path='/project' element={<Project/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
