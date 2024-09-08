import React from 'react'
import { useState,useEffect } from 'react'
import { Baseurl } from '../Baseurl'
import axios from 'axios'
import './CoinChart.css'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

);

export const CoinChart = ({currency}) => {
   
     const[chartData,setChartData] = useState([])
     const {id} = useParams()
     const [days,setDays] = useState(1)

     const CoinChartData=async()=>{
         try{
          const {data} = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
          setChartData(data.prices)
          // console.log(data.prices);
         }
         
         catch (error){
           console.log(error)
         }

          } 

    useEffect(()=>{
        CoinChartData();
    },[currency, id, days])

    const myData={
      labels: chartData.map((value)=>{
          const date = new Date(value[0])
          const time = date.getHours() > 12 
          ? `${date.getHours()-12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`
          return days === 1 ? time: date.toLocaleDateString()
      }),

      datasets:[{
        labels: `Price in Past Days ${days} in ${currency}`,
        data : chartData.map((value)=>value[1]),
        borderColor : 'orange',
        borderWidth : '2'
      }]
    }

  return (
  <>
  {
    chartData.length === 0 ? (<Loader/>) : (
      <div className='chart'>
      <Line data={myData} options={{
        elements:{
          points: {  // it is use for the chart dot width
            radius:1,
          }
        }
      }} style={{marginTop:'5rem',width:'60rem'}}/>
      
      <div className='btn' style={{marginTop:'30px'}}>
              <button onClick={()=> setDays(1)}>24 hours</button>
              <button onClick={()=> setDays(30)}>1 Month</button>
              <button onClick={()=> setDays(365)}>1 Year</button>
            </div>
  
      </div>
    )
  }
   </>
  )
}
