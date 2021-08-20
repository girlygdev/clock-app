import React, {useState, useEffect} from 'react'
import axios from 'axios'

const BlockQuote = ({ refresh = false}) => {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    if (refresh) {
      axios.get(`https://goquotes-api.herokuapp.com/api/v1/random?count=1`)
      .then(result => {
        const response = result.data
        setQuote(response.quotes[0].text)
        setAuthor(response.quotes[0].author)        

        // save to local storage
        localStorage.setItem('clockAppUserData-quote', response.quotes[0].text)
        localStorage.setItem('clockAppUserData-author', response.quotes[0].author)
      })
    } else {
      const userMessage = localStorage.getItem('clockAppUserData-quote')
      const userAuthor = localStorage.getItem('clockAppUserData-author')      

      if (userMessage) {
        setQuote(userMessage)
        setAuthor(userAuthor)
      }
    }    
  }, [refresh])

  return (
    <section className="quote">
      <p className="quote__message">
        {quote}
      </p>
      <p className="quote__author">
        by {author}
      </p>    
    </section>
  )
}

export default BlockQuote
