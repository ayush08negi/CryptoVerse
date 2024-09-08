import './App.css';
import {Routes,Route} from 'react-router-dom'
import Exchanges from './components/Exchanges/Exchanges';
import CoinDetail from './components/CoinDetail/CoinDetail';
import Coins from './components/Coins'


function App() {
  return (
   <Routes>
    <Route path='/' element = {<Exchanges/>}/>
    <Route path='/coins' element = {<Coins/>}/>
    <Route path='/coins/:id' element = {<CoinDetail/>}/>
   </Routes>
  );
}

export default App;
