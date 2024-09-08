import React from 'react'
import { useState,useEffect } from 'react'
import Loader from '../Loader'
import { Baseurl } from '../Baseurl'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../CoinDetail/CoinDetail.css'
import { BiSolidUpArrow ,BiSolidDownArrow} from "react-icons/bi"
import {IoPulseOutline} from 'react-icons/io5'
import { CoinChart } from '../CoinChart/CoinChart'
import CoinTable from '../CoinTable/CoinTable'


const CoinDetail=()=> {
   const {id} = useParams()
   const [loading, setLoading] = useState(true);
   const [coin,setCoin] = useState([])
   const [currency,setCurrency] = useState('inr')
   const profit =  coin.market_data?.market_cap_change_percentage_24h > 0
   const currencySymbol = currency === 'inr'? '₹' : '$';
  

  useEffect(()=>{
         const getCoin =async()=>{
           try{
            const {data} = await axios.get(`${Baseurl}/coins/${id}`)
            console.log(data)
            setCoin(data)
            setLoading(false)
           }
           catch(error){
              console.log(error)
              setLoading(false)
           }
         }
         getCoin(); 
  },[id])
  return (
    <div>
    {  
      loading ? <Loader/> : <>
      <div className="coin-detail" style={{display:'flex',justifyContent:'space-evenly'}}>
          <div className='coin-info'>
          <div className='btn'>
            <button onClick={()=> setCurrency('inr')}>INR</button>
            <button onClick={()=> setCurrency('usd')}>USD</button>
          </div>
          
          <div className="time">
            {coin.last_updated}
          </div>
          <div className="coin-image">
            <img src= {coin.image.large} height={'120px'} alt=''></img>
            
          </div>
          <div className="coin-name">
            {coin.name}
          </div>
          <div className="coin-price"> 
            {currencySymbol}
            {coin.market_data.ath[currency]}</div>
          <div className="coin-profit">
          {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/> }
          {coin.market_data.market_cap_change_percentage_24h}%</div>
          <div className="market-rank">
            <IoPulseOutline color='yellow'/>
              #{coin.market_cap_rank}</div>
          <div className='coin-description'>  
              <p> {coin.description.en.split('.')[0]}.</p>
          </div>
            </div>
          <CoinChart currency = {currency} />
      </div>
      </>
       }
    </div>
  )
}

export default CoinDetail