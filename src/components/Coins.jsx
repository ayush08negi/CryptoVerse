import React from 'react'
import { useState, useEffect } from 'react'
import { Baseurl } from './Baseurl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header/Header'
import { Link } from 'react-router-dom'

const Coins = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';


  // const URL = "https://api.coingecko.com/api/v3/exchanges";
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
      console.log(currency);
      console.log(data)
      setCoins(data)
      setLoading(false)
    }
    getCoinsData();
  }, [currency])

  return (
    <>
      {
        loading ? <Loader /> : <>
          <Header />
          <div className="search-bar">
            <input type='text'
              placeholder='Search your coins '
              style={{
                height: '2rem', width: '20rem', position: 'absolute', top: '1%', left: '35%',
                paddingLeft: "5px"
              }}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            ></input>
          </div>

          <div className='btn'>
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
          <div style={{}}>
            <div className='headBit'>
              <p  style={{width: '12rem'}}>#Rank</p>
              <p style={{width: '12rem'}}>Coin</p>
              <p style={{width: '12rem'}}>Coin</p>
              <p style={{width: '12rem'}}>Price</p>
              <p style={{width: '12rem'}}>% change</p>
              
            </div>
            {

              coins.filter((data) => {
                if (data === '') return data
                else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                  return data
                }
              }).map((coindata, index) => {
                return (
                  <CoinCard key={index} coindata={coindata} index={index} currencySymbol={currencySymbol} id={coindata.id} />
                )
              })
            }
          </div>
        </>
      }
    </>
  )
}

const CoinCard = ({ coindata, index, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0

  return (
    <Link to={`/coins/${id}`} style={{ color: 'white', textDecoration: 'none' }}>
      <div key={index} className="ex-card" >
        <div className="rank">
          {coindata.market_cap_rank}
        </div>
        <div className="image">
          <img height={'80px'} src={coindata.image} alt=''></img>
        </div>
        <div className="name">
          {coindata.name}
        </div>
        <div className="price">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div style={profit ? { color: "green" } : { color: "red" }} className='change'>
          {profit ? "+" + coindata.price_change_percentage_24h.toFixed(2) :
            coindata.price_change_percentage_24h.toFixed(2)}
        </div>
        <div>

        </div>

      </div>
    </Link>
  )
}
export default Coins