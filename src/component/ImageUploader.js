import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiImage, setApiImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('image')) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result;
        setSelectedImage(imageDataURL);
      }

      reader.readAsDataURL(file);
    }
  }

  const handleUpload = () => {
    if (selectedImage) {
      // Save image as JSON to API
      const apiUrl = 'https://6528e915931d71583df2912d.mockapi.io/HTML';
      const jsonData = {
        id: "1",
        image: selectedImage,
      };

      axios.post(apiUrl, jsonData)
        .then(response => {
          console.log('Image uploaded successfully:', response.data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  }

  const handleGetFromApi = () => {
    const apiUrl = 'https://6528e915931d71583df2912d.mockapi.io/HTML/1';

    axios.get(apiUrl)
      .then(response => {
        setApiImage(response.data.image);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGetFromApi}>Get Image from API</button>

      {apiImage && (
        <div>
          <h3>Image from API:</h3>
          <img src={apiImage} alt="From API" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
