import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BackgroundImage = ( { refresh = false }) => {
  const [imgSrc, setImageSrc] = useState('')  

  useEffect(() => {
    if (refresh) {
      axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: "noJECr-bg2gyA6NS2r__M9tUcvhP8bAf3iuziUZ4f9I"
        }
      }).then(result => {
        console.log(result)
  
        const response = result.data
        const fullImageLink = response.urls.regular
  
        setImageSrc(fullImageLink)

        // save to local storage
        localStorage.setItem('clockAppUserData-bg', fullImageLink)
      })
    } else {
      const userBg = localStorage.getItem('clockAppUserData-bg')
      
      if (userBg) {
        setImageSrc(userBg)
      }
    }    
  }, [refresh])

  return (
    <div className="background">
      <img src={imgSrc} alt="Clock Background" className="background__img"/> 
    </div>
  )
}

export default BackgroundImage
