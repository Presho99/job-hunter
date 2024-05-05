import React, {useState} from 'react';
import Job from './components/Job';
import Keywords from './components/Keywords';
import Doc from './components/Doc';
import './App.css';

function App() {
const [uploadedDoc, setUploadedDoc] = useState(null)
const [jobDescription, setJobDescription] = useState('')

  const handleDocumentUpload = (document) => {
    setUploadedDoc(document)
  }

  const handleJobSubmit = (jd) => {
    console.log('Job description submitted', jd)
    setJobDescription(jd)

  }
  
  return (
    <div className="App">
      <Doc handleUpload={handleDocumentUpload}/>
      <Job onSubmit={handleJobSubmit}/>
      <Keywords jobDescription={jobDescription}/>
      
      
    </div>
  );
}

export default App;
