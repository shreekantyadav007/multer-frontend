import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          "https://multer-file-upload-ydn1.onrender.com/files"
        );
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://multer-file-upload-ydn1.onrender.com/upload",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully");
      setFile(null);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };
  return (
    <>
      <div className="App">
        <h1>File upload and metadata viewer</h1>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        <h2>Uploaded Files</h2>
        <ul>
          {files.length > 0 &&
            files.map((file, index) => (
              <li key={index}>
                <strong>
                  {file.filename} -{" "}
                  {new Date(file.uploadDate).toLocaleDateString()}
                </strong>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
