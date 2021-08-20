import React, { useState, useEffect } from 'react'
import moment from 'moment'

const CurrentTime = ( { country }) => {
  const [time, setTime] = useState(moment().format('hh:mm A'))
  const [greeting, setGreeting] = useState('Hi')

  const getTime = () => {
    setTime(moment().format('hh:mm A'))
  }

  const getGreeting = () => {
    const hour = moment().format('HH')

    if (hour >= 4 && hour < 12) {
      setGreeting('Good morning')
    } else if (hour >= 12 && hour < 16) {
      setGreeting('Good afternoon')
    } else if (hour >= 16 && hour < 20) {
      setGreeting('Good evening')
    } else if (hour >= 20 && hour < 4) {
      setGreeting('Good night')
    }
  }

  useEffect(() => {
    const time = setInterval(getTime, 1000)
    getGreeting()

    return () => clearInterval(time)
  })

  return (
    <div className="day">
      <div className="day__greeting">
        <i className="fas fa-cloud-sun"></i> {' '}
        {greeting}, it's currently
      </div>
      <div className="day__time">
        <div className="day__time__value">{time}</div>       
      </div>
      <div className="day__loc">
        {country}
      </div>
    </div>
  )
}

export default CurrentTime
