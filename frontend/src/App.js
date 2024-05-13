import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarPortfolio from './components/home-components/NavbarPortfolio';
import AboutPortfolio from './components/home-components/AboutPortfolio';
import HomePortfolio from './components/home-components/HomePortfolio';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavbarPortfolio />
        <Routes>
          <Route exact path='/' element={<HomePortfolio />}></Route>
          <Route path='/about' element={<AboutPortfolio />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
