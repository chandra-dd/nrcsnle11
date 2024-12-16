import { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setImageUrl(data.fileUrl);  // Set the uploaded image URL
    }
  };

  const handleImageDelete = async () => {
    const fileName = imageUrl.split('/').pop();
    
    const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });

    if (response.ok) {
      setImageUrl(null);  // Clear the image URL after deletion
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" width={200} />
          <button onClick={handleImageDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
};

export default Upload;
