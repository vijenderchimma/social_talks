import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import API_URL from './Api';

function Home() {
  const [discussions, setDiscussions] = useState([]);
  const token = localStorage.getItem('authToken');

  const navigate = useNavigate()

  if (!token) {
    navigate('/login', { reverse: true })
  }

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/discussions/alldiscussions`, {
          headers: { 'authToken': token }
        });
        console.log(res.data)
        if (res.status === 200) {
          setDiscussions(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDiscussions();
  }, [token]);

  const handleCommentClick = (id) => {
    navigate(`/comments/${id}`)
  }
  const handleLikeClick = (id) => {
    console.log(id)
  }


  return (
    <>
      <Navbar />
      <div className='home-section'>
        <h1>All Discussions</h1>
        <ul className='discussion-link-container'>
          {discussions && discussions.map(discussion => {
            return (
              <>
                <li key={discussion._id}>
                  {discussion.text}
                </li>
                <img src={`${API_URL}/uploads/${discussion.image}`} alt={discussion.text} className='discussion-image' /><br />

                <div>
                  <button onClick={() => handleLikeClick(discussion._id)}>Like</button>
                  <button onClick={() => handleCommentClick(discussion._id)}>Comment</button>
                </div>
              </>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
