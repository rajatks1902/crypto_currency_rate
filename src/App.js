import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
// import dotenv from "dotenv"

//dotenv.config();
// console.log(process.env.PORT)
const options = {
  method: 'GET',
  url: 'https://currency-exchange.p.rapidapi.com/exchange',
  params: {from: 'USD', to: 'INR', q: '1.0'},
  headers: {
    'X-RapidAPI-Key': '027e1e5d94msh9b1e994c8b00873p1cdb77jsn0da61ecdabf7',
    'X-RapidAPI-Host':'currency-exchange.p.rapidapi.com'
  }
};
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [current, setCurrent]=useState('');
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(coins);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

 useEffect(()=>{
  axios.request(options).then(function (response) {
    setCurrent(response.data);
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 },[]);
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price*parseInt(current)}
            // priceind={(coin.current_price)*parseInt(current)}
            symbol={coin.symbol}
            marketcap={coin.total_volume*parseInt(current)}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h*parseInt(current)}
          />
        );
      })}
    </div>
  );
}

export default App;