import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import './Style.css';
import NavbarPortfolio from './components/home-components/NavbarPortfolio';
import AboutPortfolio from './components/home-components/AboutPortfolio';
import HomeScreen from './components/home-components/HomeScreen';
import DashboardLogin from './components/dashboard/DashboardLogin';
import DashboardRegister from './components/dashboard/DashboardRegister';
import Dashboard from './components/dashboard/Dashboard';
import UserProvider from './context/UserContext';
import NewDashboardUser from './components/dashboard/NewDashboardUser';
import { userInputs } from './json-data/formsData';
import UsersAllView from './components/users/UsersAllView';

function App() {
  return (
    <div className='App'>
      <div className="container">
        <UserProvider>
          <BrowserRouter>
            <ConditionalNavbar />
            <Routes>
              <Route exact path='/' element={<HomeScreen />} />
              <Route path='/about' element={<AboutPortfolio />} />
              <Route path='/login' element={<DashboardLogin />} />
              <Route path='/register' element={<DashboardRegister />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/add-user' element={<NewDashboardUser inputs = {userInputs} title='Add New User' />} />
              <Route path='/users' element={<UsersAllView />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
    </div>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login'];
  const hideRegisterPaths = ['/register'];
  const hideForDashboard = ['/dashboard'];
  const hideForNewUser = ['/add-user'];
  const hideForUseres = ['/users']

  const shouldShowDashboard = !hideNavbarPaths.includes(location.pathname);
  const shouldShowRegister = !hideRegisterPaths.includes(location.pathname);
  const showHomeDashboard = !hideForDashboard.includes(location.pathname);
  const showDashboardUser = !hideForNewUser.includes(location.pathname);
  const showAllUsers = !hideForUseres.includes(location.pathname);

  return shouldShowDashboard && shouldShowRegister && showHomeDashboard && showDashboardUser && showAllUsers ? <NavbarPortfolio /> : null;
}

export default App;
