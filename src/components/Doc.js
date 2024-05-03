import React, { useState } from "react";

function Doc({handleUpload}) {
  const [document, setDocument] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setDocument(file)
  }

  const handleUploadClick = () => {
    if(document){
      handleUpload(document)
      // Clear the selected document after upload
      setDocument(null) 
    }else {
      console.error("No document selected.")
    }
  }

  return <div className="doc">
    <input type="file"  onChange={handleFileChange}/>
    <button onClick={handleUploadClick}>Upload Document</button>
  </div>;
}

export default Doc;
