import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { Baseurl } from '../Baseurl'
import Loader from '../Loader'
import './Exchanges.css'
import OutModel from '../OutModel'

const Exchanges = () => {

  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`)
      console.log(data)
      setExchanges(data)
      setLoading(false)
    }
    getExchangesData();
  }, [currency])

  return (
    <>
      {
        loading ? <Loader /> : <>
          <Header />
          <OutModel />

          <div>
            {
              exchanges.map((item, i) => {
                return (
                  <div key={i} className="ex-card">
                    <div className="rank">
                      {item.trust_score_rank}
                    </div>
                    <div className="image">
                      <img height={'80px'} src={item.image} alt=''></img>
                    </div>
                    <div className="name">
                      {item.name}
                    </div>
                    <div className="price">
                      {currencySymbol} {item.trade_volume_24h_btc.toFixed(0)}
                    </div>

                  </div>
                )
              })
            }
          </div>
        </>
      }
    </>
  )
}


export default Exchanges