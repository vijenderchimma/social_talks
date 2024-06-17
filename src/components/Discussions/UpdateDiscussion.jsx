import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import API_URL from '../Api';

function UpdateDiscusssion() {
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [hashtags, setHashtags] = useState('');
  const token = localStorage.getItem('authToken');
  const {id} = useParams()


  const handleimageUpload = (e) => {
    const selectedImage = e.target.files[0]
    setFile(selectedImage)
  }

  const updateDiscussionHandler= async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', file);
    formData.append('hashtags', hashtags);
    try {
      const res = await axios.put(`${API_URL}/api/discussions/${id}`,
        formData, {
        headers: {'Content-Type': 'multipart/form-data', 'authToken': token }
      });
      console.log(res.data);
      if(res.status === 200) {
        alert('Discussion Updated Successfully')
      }
    } catch (err) {
      console.error(err);
      alert("Failed to Update Discussion")
    }
  };


  return (
    <>
    <Navbar />
    <div>
      <form onSubmit={updateDiscussionHandler}>
        <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} required /><br />
        <input type="file" onChange={handleimageUpload} required/><br />
        <input type="text" placeholder="Hashtags (comma separated)" value={hashtags} onChange={(e) => setHashtags(e.target.value)} /><br />
        <button type="submit">Update Discussion</button>
      </form>
    </div>
    </>
  );
}

export default UpdateDiscusssion;