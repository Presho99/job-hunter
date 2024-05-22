import React, {useEffect, useState} from 'react'
import '../components/Score.css'
import {GoogleGenerativeAI} from "@google/generative-ai"

function Score({jobDescription, uploadedDoc}) {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
  const [score, setScore] = useState(0)
  const [displayedScore, setDisplayedScore] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function calculateCompatibility() {
      if (!jobDescription || !uploadedDoc){
        console.error("Job description and uploaded cv are required")
        return
      }
      setLoading(true)
      const model = genAI.getGenerativeModel({model: "gemini-pro"})    
      const prompt = `Please provide a percentage value indicating how well the job description and the uploaded CV match on a scale of 1 to 100: ${jobDescription}\n\n${uploadedDoc}`;    
      
      try{
        const result = await model.generateContent(prompt)
        const response = await result.response
        const scorePercent = parseInt(await response.text(), 10)
        setScore(scorePercent)
      }catch(error){
        console.error("Error generating content:", error)
        setScore(0)
      }finally{
        setLoading(false)
      }      
    }  
    if(jobDescription && uploadedDoc){
      calculateCompatibility()
    }
  }, [jobDescription, uploadedDoc])

  useEffect(() => {
    if(score > 0){
      let start = 0
      const duration = 2000
      const increment = score / (duration / 10)

      const animateScore = () => {
        start += increment
        if (start < score) {
          setDisplayedScore(Math.round(start))
          setTimeout(animateScore, 10)
        }else {
          setDisplayedScore(score)
        }
      }
      animateScore()
    }
  }, [score])
 

  return (
    <div className='score'>
     
      {
        loading ? (
          <p>Calculating...</p>
        ) : (
         <p className='score-text'>Score: {displayedScore}%</p>
        )
      }
    </div>
  )
}

export default Score