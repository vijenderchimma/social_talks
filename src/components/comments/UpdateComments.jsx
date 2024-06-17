import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import API_URL from '../Api'

const UpdateComments = () => {
    const [comment,setComment] = useState('')
    const token = localStorage.getItem('authToken')
    const {id} = useParams()

    const handleCommentClick = async () => {
        try {
            const response = await axios.put(`${API_URL}/api/comments/comments/${id}`, {text:comment}, {
                headers: {'authToken': token}
            })
            if(response.status === 200){
                alert("comment updated successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
    <Navbar />
    <div>
        <input type="text" placeholder='Enter comment' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleCommentClick}>Comment</button>
    </div>
    </>
  )
}

export default UpdateComments