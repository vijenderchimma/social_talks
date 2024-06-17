import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import API_URL from '../Api'

const CommentsForm = () => {
  const [comment, setComment] = useState('')
  const [commentsList,setCommentsList] = useState([])
  const token = localStorage.getItem('authToken')
  const { id } = useParams()
  const navigate = useNavigate()

  const handleCommentClick = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/comments/discussions/${id}/comments`, { text: comment }, {
        headers: { 'authToken': token }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchCommnets = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/comments/getallcomments`,
          {
            headers: { 'authToken': token }
          }
        )
        if (response.status === 200){
          setCommentsList(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCommnets()
  }, [token])


  const handleUpdateClick = (id) =>{
    navigate(`/update-comments/${id}`)
  }
  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/comments/delete/${id}`,{
        headers: {'authToken': token}
      })
      if(response.status === 200){
        alert("comment deleted successfully")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <Navbar />
    <div>
      <h3>Comments</h3>
      <input type="text" placeholder='Enter comment' value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleCommentClick}>Comment</button>
      {commentsList && commentsList.map(comments=>{
        return (
          <>
          <li key = {comments._id}>{comments.text}</li>
          <button onClick={()=>handleUpdateClick(comments._id)}>update</button>
          <button onClick={()=>handleDeleteClick(comments._id)}>delete</button>
          </>
        )
      })}
    </div>
    </>
  )
}

export default CommentsForm