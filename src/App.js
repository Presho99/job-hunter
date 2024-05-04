import React, {useState} from 'react';
import Job from './components/Job';

import Doc from './components/Doc';
import './App.css';

function App() {
const [uploadedDoc, setUploadedDoc] = useState(null)

  const handleDocumentUpload = (document) => {
    setUploadedDoc(document)
  }

  const handleJobSubmit = (jd) => {
    console.log('Job description submitted', jd)

  }
  
  return (
    <div className="App">
      <Doc handleUpload={handleDocumentUpload}/>
      <Job onSubmit={handleJobSubmit}/>
      
      
    </div>
  );
}

export default App;
