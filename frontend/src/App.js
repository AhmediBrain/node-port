import { BrowserRouter, matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
//import BasicHomeComponent from './practice-test/BasicHomeComponent';
import './Style.css';
//import IbrainHomePage from './ibrain-website/IbrainHomePage';
//import AddAndDeleteComponent from './practice-test/AddAndDeleteComponent';
//import AddNewUserComponent from './practice-test/AddNewUserComponent';
import NavbarPortfolio from './components/home-components/NavbarPortfolio';
import AboutPortfolio from './components/home-components/AboutPortfolio';
import HomeScreen from './components/home-components/HomeScreen';
import DashboardLogin from './components/dashboard/DashboardLogin';
import DashboardRegister from './components/dashboard/DashboardRegister';
import Dashboard from './components/dashboard/Dashboard';
import UserProvider, { UserContext } from './context/UserContext';
import NewDashboardUser from './components/dashboard/NewDashboardUser';
import { playerInputs, userInputs } from './json-data/formsData';
import UsersAllView from './components/users/UsersAllView';
import UsersProfile from './components/users/UsersProfile';
import { useContext } from 'react';
import NetsPlayerViewComponent from './components/nets/NetsPlayerViewComponent';
import AddNewPlayerComponent from './components/nets/AddNewPlayerComponent';
// import QuarterlyProgressReport from './quarterly-progress/QuarterlyProgressReport';
// import ClockInClockOut from './ClockInClockOut';
// import PracticeFetchTableData from './practice-test/PracticeFetchTableData';

function App() {
  return (
    <div className='App'>
      <div className="container">
        {/* <BasicHomeComponent /> */}
        {/* <AddAndDeleteComponent /> */}
        {/* <AddNewUserComponent /> */}
        {/* <IbrainHomePage /> */}
        {/* <PracticeFetchTableData /> */}
        {/* <ClockInClockOut /> */}
        {/* <QuarterlyProgressReport /> */}
        <BrowserRouter>
          <UserProvider>
            <ConditionalNavbar />
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/about' element={<AboutPortfolio />} />
              <Route path='/login' element={<DashboardLogin />} />
              <Route path='/register' element={<DashboardRegister />} />
              <Route path='/dashboard' element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path='/add-user' element={
                <PrivateRoute>
                  <NewDashboardUser inputs={userInputs} title='Add New User' />
                </PrivateRoute>
              } />
              <Route path='/users' element={
                <PrivateRoute>
                  <UsersAllView />
                </PrivateRoute>
              } />

              <Route path='/nets' element={
                <PrivateRoute>
                  <NetsPlayerViewComponent />
                </PrivateRoute>
              } />

              <Route path='/add-player' element={
                <PrivateRoute>
                  <AddNewPlayerComponent inputs={playerInputs} title='Add New Player' />
                </PrivateRoute>
              } />

              <Route path='/profile/:userID' element={
                <PrivateRoute>
                  <UsersProfile />
                </PrivateRoute>
              } />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = [ '/dashboard', '/login', '/register', '/add-user', '/users', '/nets', '/add-player', '/profile/:userID'];

  const shouldShowNavbar = !hideNavbarPaths.some(path => matchPath(path, location.pathname));

  return shouldShowNavbar ? <NavbarPortfolio /> : null;
}

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to='/login' />
}

export default App;