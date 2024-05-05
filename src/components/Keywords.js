import React, {useEffect, useState} from 'react'
import {GoogleGenerativeAI} from '@google/generative-ai'

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
    const prompt = `Generate keywords from the job description: ${jobDescription}`
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
    <div>
      <h2>Keywords</h2>
      {hasData ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        )
      ): (
        <p>No data</p>
      )}
      <button onClick={generateKeywords}>Generate Keywords</button>
    </div>
  )
}

export default Keywords