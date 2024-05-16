import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";

function Doc({handleUpload}) {
  const [document, setDocument] = useState("");

  const handleFileChange = (e) => {
    setDocument(e.target.value)
  }

  const handleUploadClick = () => {
    if(document.trim()){
      handleUpload(document)
      // Clear the selected document after upload
      setDocument("") 
    }else {
      console.error("No content provided.")
    }
  }

  const handleDeleteClick = () => {
    setDocument("")
  }

  return <div className="doc">
  <textarea
  value={document}
  onChange={handleFileChange}
  placeholder="Paste your cv here"
  />
    {document && (
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick}/>
      </div>
    )}
    <button onClick={handleUploadClick}>Upload Document</button>
  </div>;
}

export default Doc;
