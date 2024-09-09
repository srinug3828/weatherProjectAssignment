import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import cloudIcon from '../assets/icons/Cloud.png'
import rainIcon from '../assets/icons/Rain.png'
import sunIcon from '../assets/icons/Sun.png'
import sunnyBg from '../assets/images/Sunnyimg.jpeg'

import cloudBg from '../assets/images/Cloudyimg.jpeg'
import rainBg from '../assets/images/Rainyimg.jpeg'
import ForeCast from './ForeCast'
const WeatherPage = () => {
    
    const {cityName} = useParams()
    console.log("cityname",cityName)
    const [weatherData,setWeatherData]=useState(null)
    const [wIcons,setWIcons] = useState(sunIcon)
    const [weatherBg,setWeatherBg] = useState(sunnyBg)
    const [currentDate,setCurrentDate] = useState("")
  
    useEffect(()=>{
        const fetchWeatherData=async () => {
            try{
             const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}`)
                
           
             setWeatherData(res.data)
           

            }catch(err){
                console.log("fetching error weather",err)
            }
        }
        fetchWeatherData()
        

    },[])
   //console.log("state",weatherData)
    

    useEffect(()=>{

        if (weatherData && weatherData.weather){
            const weatherIcon = weatherData.weather[0].main
        if(weatherIcon==="Clouds"){
            setWIcons(cloudIcon)
            setWeatherBg(cloudBg)

        }else if(weatherIcon==="Rain"){
            setWIcons(rainIcon)
            setWeatherBg(rainBg)
        }else if(weatherIcon==="Clear"){
            setWIcons(sunIcon)
            setWeatherBg(sunnyBg)
        }

        }
        const date=new Date()
        const options = {weekday: "long", year: "numeric", month:"long", day:"numeric"}
        setCurrentDate(date.toLocaleDateString("en-Us",options))
        

    },[weatherData])
  return (
    <div>
      <>
  {
    weatherData && ( <div className="min-h-screen flex items-center gap-5 justify-center" style={{backgroundImage:`url(${weatherBg})`,backgroundSize:"cover",backgroundPosition:"center"}}>
        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-2">
          <div className="font-bold text-xl">{cityName}</div>
          <div className="text-sm text-gray-500">{currentDate}</div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
            <img src={wIcons} alt=""/>
          </div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-6xl">{(weatherData.main.temp-273.15).toFixed(1)}°c</div>
            <div className="flex flex-col items-center ml-6">
              <div>{weatherData.weather[0].main}</div>
              <div className="mt-1">
                <span className="text-sm">
                  <i className="far fa-long-arrow-up" />
                </span>
                <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_max-273.15).toFixed(1)}°C</span>
              </div>
              <div>
                <span className="text-sm">
                  <i className="far fa-long-arrow-down" />
                </span>
                <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_min-273.15).toFixed(1)}°C</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Wind</div>
              <div className="text-sm text-gray-500">{weatherData.wind.speed} m/s</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Humidity</div>
              <div className="text-sm text-gray-500">{weatherData.main.humidity}%</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Pressure</div>
              <div className="text-sm text-gray-500">{weatherData.main.pressure}</div>
            </div>
          </div>
        </div>
        <ForeCast/>
      </div>)
  }
  
 
</>

    </div>
  )
}

export default WeatherPage
