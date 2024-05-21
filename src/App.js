import React, { useState } from "react";
import Job from "./components/Job";
import Keywords from "./components/Keywords";
import Doc from "./components/Doc";
import Score from "./components/Score";
import Correction from "./components/Correction";
import Prep from "./components/Prep";

import "./App.css";

function App() {
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleDocumentUpload = (document) => {
    setUploadedDoc(document);
  };

  const handleJobSubmit = (jd) => {
    console.log("Job description submitted", jd);
    setJobDescription(jd);
  };

  return (
    <div className="App">
      <div className="grid-container">
        <div className="left">
          <Score jobDescription={jobDescription} uploadedDoc={uploadedDoc} />
          <Keywords jobDescription={jobDescription} />
        </div>
        <div className="middle">
          {!uploadedDoc ? (
             <Doc handleUpload={handleDocumentUpload} />
          ) : (
            <Job onSubmit={handleJobSubmit} />
          )}
         
         <Correction jobDescription={jobDescription} uploadedDoc={uploadedDoc} />
         
        </div>
        <div className="right">
            <Prep jobDescription={jobDescription}/>
        </div>

     
      </div>
    </div>
  );
}

export default App;
