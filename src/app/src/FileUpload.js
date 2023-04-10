import React, { useState } from 'react';
import FileProcessor from './backend/FileProcessor';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setFile(fileContent);
      if(file != null) FileProcessor(file);
    };
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <pre key={file}>{file}</pre>
      </div>
    </>
  );
}

export default FileUpload;
