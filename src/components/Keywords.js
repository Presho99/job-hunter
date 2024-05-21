import React, {useEffect, useState} from 'react'
import {GoogleGenerativeAI} from '@google/generative-ai'
import '../components/Keywords.css'

function Keywords({jobDescription}) {
  const genAI = new GoogleGenerativeAI('AIzaSyD94CdKXLoxcR_u-hb7Y1TR9cHHQ2aMT1c')
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    if(jobDescription){
      generateKeywords()
      setHasData(true)
    }else{
      setKeywords([])
      setHasData(false)
    }
  }, [jobDescription])

  async function generateKeywords(){
    setLoading(true)
    const model = genAI.getGenerativeModel({model: "gemini-pro"})
    const prompt = `Generate only the most important keywords from the job description and not the entire sentence: ${jobDescription}`
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    const extractedKeywords = extractKeywords(text)
    setKeywords(extractedKeywords)
    setLoading(false)

  }

  function extractKeywords(text){
    return text.split(' ')
  }

  return (
    <div className='keywords'>
      <h2 className='key-heading'>Keywords</h2>
      {hasData ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className='key-tv'>
             <ul className=''>
            {keywords.map((keyword, index) => (
              <li key={index} className="key-tabs">{keyword}</li>
            ))}
          </ul>
          </div>
         
        )
      ): (
       
        <p className='key-below'>Keywords will appear here</p>
      )}
    
    </div>
  )
}

export default Keywords