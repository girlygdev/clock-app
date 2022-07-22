
import React, { useState, useEffect } from 'react'
import BackgroundImage from './components/BackgroundImage'
import BlockQuote from './components/BlockQuote'
import CurrentTime from './components/CurrentTime'
import Details from './components/Details'

import axios from 'axios'
import moment from 'moment'

const App = () => {
  const [showDetails, setShowDetails] = useState(0)
  const [country, setCountry] = useState('')
  const [requestNewData, setRequestNewData] = useState(false)
  const [weatherData, setWeatherData] = useState({
    minTemp: 0,
    maxTemp: 0,
    weather: '',
    sunrise: '',
    sunset: '',
    countryAbbrev: 'PH'
  })
  const [coordinates, setCoordinates] = useState({
    latitude: 15.4827722,
    longitude: 120.7120023
  })

  useEffect(() => {
    // save user on browser local storage
    if (localStorage.getItem('clockAppUserData-date')) {    
      const date = localStorage.getItem('clockAppUserData-date')

      if (moment().format('YYYY-MM-DD') !== date) {
        setRequestNewData(true)
      }
    } else {
      // setup defaults
      setRequestNewData(true)
      localStorage.setItem('clockAppUserData-status', 'existing')
      localStorage.setItem('clockAppUserData-date', moment().format('YYYY-MM-DD'))
      localStorage.setItem('clockAppUserData-quote', 'Whatever your goal in life, unless you develop a great urgency, what could be near will be far away.')
      localStorage.setItem('clockAppUserData-author', 'Anon')
      localStorage.setItem('clockAppUserData-bg', "https://images.unsplash.com/photo-1627133935524-6b60fa3f5fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTI2NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mjk0NDA4OTk&ixlib=rb-1.2.1&q=80&w=1080")
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      // check for user permissions
      navigator.permissions
        .query({ name: "geolocation"})
        .then(result => {
          const permissionType = result.state

          switch(permissionType) {
            case 'granted' :
              setUserCoordinates()
              break;
            
            case 'prompt' :
              setUserCoordinates()
              break;

            case 'denied' :
              break;

            default:
              break;
          }          
        })
    } else {
      console.log('Geolocation API is not supported by browser')
    }
  }, [])

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/alpha/${weatherData.countryAbbrev}`)
    .then(response => {
      const data = response.data
      setCountry(data.name)
    })
  }, [weatherData])

  useEffect(() => {    
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        appid: "48e720c185c515eee33e2cd291197d33",
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        units: "metric"
      }
    })
    .then(response => {
      const info = response.data

      const sunriseUnix = info.sys.sunrise * 1000
      const sunsetUnix = info.sys.sunset * 1000
      const countryAbbrev = info.sys.country

      const data = {
        minTemp: info.main.temp_min,
        maxTemp: info.main.temp_max,
        sunrise: moment(sunriseUnix).format('hh:mm A'),
        sunset: moment(sunsetUnix).format('hh:mm A'),
        countryAbbrev: countryAbbrev
      }

      setWeatherData(data)
    })
  }, [coordinates])

  const setUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })      
    }, function(errors) {
      console.log(errors)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }

  const clearUserData = () => {
    setRequestNewData(true)
    localStorage.removeItem('clockAppUserData-status')
    localStorage.removeItem('clockAppUserData-date')
    localStorage.removeItem('clockAppUserData-quote')
    localStorage.removeItem('clockAppUserData-author')
    localStorage.removeItem('clockAppUserData-bg')
  }

  return (
    <div className="App">
      <BackgroundImage refresh={requestNewData}/>
      <BlockQuote refresh={requestNewData}/>

      <div className={`main ${showDetails ? 'open' : ''}`}>
        {/* Get Time based on users browser */}
        <CurrentTime country={country} />

        {/* Show weather and other info based on detected user location */}
        <section className={`details ${showDetails ? 'open' : ''}`}>
          <div className="actions">
            <button className="actions__btn" onClick={() => setShowDetails(!showDetails)}>
              more <i className="fas fa-arrow-up icon-arrow"></i>
            </button>
            <button className="actions__btn refresh" onClick={clearUserData}>
              refresh <i className="fas fa-sync-alt icon-arrow"></i>
            </button>
          </div>
          
          <Details weatherData={weatherData}/>
        </section>
      </div>
    </div>
  )
}

export default App
