import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";

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

  const handleDeleteClick = () => {
    setDocument(null)
  }

  return <div className="doc">
    <input type="file"  onChange={handleFileChange}/>
    {document && (
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick}/>
      </div>
    )}
    <button onClick={handleUploadClick}>Upload Document</button>
  </div>;
}

export default Doc;
