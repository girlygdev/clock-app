import React from 'react'
import moment from 'moment-timezone'

const Details = ({ weatherData }) => {  
  return (
    <div className="info">
      <div className="info__item">
        <div className="info__item__label">current timezone</div>
        <div className="info__item__value">{moment.tz.guess()}</div>
      </div>

      <div className="info__item">
        <div className="info__item__label">current date</div>
        <div className="info__item__value">{moment().format('ddd, DD MMMM YYYY')}</div>
      </div>

      <div className="info__item">
        <div className="info__item__label">sunrise | sunset</div>
        <div className="info__item__value">{weatherData.sunrise} | {weatherData.sunset}</div>
      </div>

      <div className="info__item">
        <div className="info__item__label">reel feel</div>
        <div className="info__item__value">{weatherData.minTemp}&deg; | {weatherData.maxTemp}&deg;Celsius</div>
      </div>
    </div>
  )
}

export default Details
