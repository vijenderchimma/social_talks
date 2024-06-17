import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import API_URL from '../Api';

function DiscussionForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [hashtags, setHashtags] = useState('');
  const token = localStorage.getItem('authToken');


  const handleimageUpload = (e) => {
    const selectedImage = e.target.files[0]
    setFile(selectedImage)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', file);
    formData.append('hashtags', hashtags);
    try {
      const res = await axios.post(`${API_URL}/api/discussions/create`,
        formData, {
        headers: {'Content-Type': 'multipart/form-data', 'authToken': token }
      });
      console.log(res.data);
      if(res.status === 200) {
        alert('Discussion added Successfully')
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add Discussion")
    }
  };


  return (
    <>
    <Navbar />
    <div>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} required /><br />
        <input type="file" onChange={handleimageUpload} required/><br />
        <input type="text" placeholder="Hashtags (comma separated)" value={hashtags} onChange={(e) => setHashtags(e.target.value)} /><br />
        <button type="submit">Create Discussion</button>
      </form>
    </div>
    </>
  );
}

export default DiscussionForm;
