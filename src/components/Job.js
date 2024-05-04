import React, {useState} from 'react'

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
   <form onSubmit={handleSubmit}>
     <textarea
     value={jd}
     onChange={handleTextareaChange}
     placeholder="Enter job description here..."
     
     />
     <button type='submit' disabled={isDisabled}>Post Job</button>
   </form>
  )
}

export default Job