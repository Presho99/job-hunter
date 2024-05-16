import React, {useState} from 'react'
import {GoogleGenerativeAI} from "@google/generative-ai"

function Score({jobDescription, uploadedDoc}) {
  const genAI = new GoogleGenerativeAI('AIzaSyDdNJ_lp36HWLWayhn-nGENZ8fYosU8EeA');
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)

  async function calculateCompatibility() {
    if (!jobDescription || !uploadedDoc){
      console.error("Jd and uploaded cv are required")
      return
    }
    setLoading(true)
    const model = genAI.getGenerativeModel({model: "gemini-pro"})    
    const prompt = `Please provide a percentage value indicating how well the job description and the uploaded CV match on a scale of 1 to 100: ${jobDescription}\n\n${uploadedDoc}`;    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const scorePercent = await response.text()
    setScore(scorePercent)
    setLoading(false)
  }  

  return (
    <div>
      <h2>Compatibility Score</h2>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {score ? (
              <p>Score: {score}</p>
            ): (
              <button onClick={calculateCompatibility}>Calculate Score</button>
            )}
          </div>
        )
      }
    </div>
  )
}

export default Score