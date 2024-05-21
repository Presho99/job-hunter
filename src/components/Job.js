import React, {useState} from 'react'
import '../components/Job.css'

function Job({onSubmit}) {
  const [jd, setJd] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

const handleTextareaChange = (e) => {
  const text = e.target.value
  setJd(text)
  setIsDisabled(text.trim().length === 0)
}

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(jd)
    setJd('')
  }

  return (
   <div  className="job">
     <textarea
     className='job-text'
     value={jd}
     onChange={handleTextareaChange}
     placeholder="Enter job description here..."
     
     />
     <button onClick={handleSubmit} type='submit' disabled={isDisabled} className="job-btn">Post Job</button>
   </div>
  )
}

export default Job