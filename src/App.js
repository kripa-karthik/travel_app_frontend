import {Route,Routes} from "react-router-dom";
import { Home,SingleHotelPage,SearchResults,Wishlist } from './pages/index';
import './App.css';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotelPage/>}></Route>
      <Route path='/hotels/:address' element={<SearchResults/>} />
      <Route path="/wishlist" element={<Wishlist/>} />
    </Routes>
  );
}

export default App;
