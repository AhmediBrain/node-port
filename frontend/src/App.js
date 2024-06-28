import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import NavbarPortfolio from './components/home-components/NavbarPortfolio';
import AboutPortfolio from './components/home-components/AboutPortfolio';
import HomeScreen from './components/home-components/HomeScreen';
import DashboardLogin from './components/dashboard/DashboardLogin';
import DashboardRegister from './components/dashboard/DashboardRegister';

function App() {
  return (
    <div className='App'>
      <div className="container">
        <BrowserRouter>
          <ConditionalNavbar />
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/about' element={<AboutPortfolio />} />
            <Route path='/login' element={<DashboardLogin />} />
            <Route path='/register' element={<DashboardRegister />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login'];
  const hideRegisterPaths = ['/register'];

  const shouldShowDashboard = !hideNavbarPaths.includes(location.pathname);
  const shouldShowRegister = !hideRegisterPaths.includes(location.pathname);

  return shouldShowDashboard && shouldShowRegister ? <NavbarPortfolio /> : null;
}

export default App;
