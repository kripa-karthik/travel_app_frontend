import {Route,Routes} from "react-router-dom";
import { Home,SingleHotelPage,SearchResults } from './pages/index';
import './App.css';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotelPage/>}></Route>
      <Route path='/hotels/:address' element={<SearchResults/>} />
    </Routes>
  );
}

export default App;
