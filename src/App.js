import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
// import Index from './Pages';
import Body from './Pages/Body/body';
import Footer from './Pages/Footer/Footer';
import Reviews from './Pages/Reviews/Reviews';
import Carousel from './Pages/Carousal/Carousal';
import NavBar from './Pages/NavBar/NavBar';
import OfferDetails from './Pages/OfferDetails/OfferDetails';
import ShopDetails from './Pages/ShopDetails/ShopDetails';
import CheckCode from './Pages/CheckingCode/CheckCode';
import GalleryWithCarousel from './Pages/Gallery/Gallery';

function App() {
  return (
    <>
      <Router basename='/offerweb'>
        <Routes>
          <Route path='/' element={<Home />} />----------
          {/* <Route path='/index' element={Index} ></Route> */}
          <Route path='/body' element={<Body />} />----------
          <Route path='/footer' element={<Footer />} />----------
          <Route path='/Reviews' element={<Reviews />} />---------
          <Route path='/Carousel' element={<Carousel />} />----------
          <Route path='/NavBar' element={<NavBar />} />
          <Route path='/OfferDetails' element={<OfferDetails />} />-------
          <Route path='/ShopDetails' element={<ShopDetails />} />---------
          <Route path='/Gallery' element={<GalleryWithCarousel />} />
          <Route path='/CheckCode' element={<CheckCode />} />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
