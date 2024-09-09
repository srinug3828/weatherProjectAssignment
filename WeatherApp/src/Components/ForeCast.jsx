import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import cloudIcon from '../assets/icons/Cloud.png'
import rainIcon from '../assets/icons/Rain.png'
import sunIcon from '../assets/icons/Sun.png'

const ForeCast = () => {

    const [foreCastData,setForeCastData] =useState([])

    const [loading,setLoading] = useState(true)
    const {cityName} = useParams()
    useEffect(()=>{
        const fetchForeCastData=async () => {
            try{
             const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}`)
                
           const dailyForeCasts=res.data.list.filter((item,index)=>index%8===0)
            setForeCastData(dailyForeCasts)
            setLoading(false)
           

            }catch(err){
                console.log("fetching error weather",err)
            }
        }
        fetchForeCastData()
        

    },[cityName])

    
    
  return (
    <div>
      <h1 className="font-bold text-xl">ForeCast</h1>
      {
        loading?(
            <p>Loading...</p>
        ):(
        <div className='flex'>
            {
                foreCastData.map((day,index)=>{
                    let weatherIcon
                    if (day.weather[0].main==="Clouds"){
                        weatherIcon =cloudIcon

                    }
                    else if(day.weather[0].main==="Rain"){
                        weatherIcon =rainIcon

                    }
                    else if(day.weather[0].main==="Clear"){
                        weatherIcon =sunIcon

                    }
                    //extracting date
                    const date = new Date(day.dt_txt)
                    const forecastDate = date.toLocaleDateString('en-Us',{weekday: "long", year: "numeric", month:"long", day:"numeric"})
                    return(
                        <div key={index} className='flex flex-col xl:gap-2 items-center text-white'>
                        <p class Name='font-semibold'>{forecastDate}</p>
                        <img src={weatherIcon} alt="" className='w-[30px]'/>
                        <p className='font-semibold'>Max Temp{(day.main.temp_max-273.15).toFixed(1)} °c</p>
                        <p className='font-semibold'>Min Temp{(day.main.temp_min-273.15).toFixed(1)} °c</p>
                        <p>{day.weather[0].description}</p>
                        <p>{day.pop*100}%</p>

                    </div>
                    )
                    


})
            }
        </div>
        )
      }
      </div>
    
  )
}

export default ForeCast
