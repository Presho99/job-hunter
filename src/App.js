import React, {useState} from 'react';
import Doc from './components/Doc';
import './App.css';

function App() {
  const handleDocumentUpload = () => {
    console.log("CV Uploaded")
  }
  
  return (
    <div className="App">
      <Doc handleUpload={handleDocumentUpload}/>
      
    </div>
  );
}

export default App;
