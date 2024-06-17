import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import API_URL from '../Api'

const MyDiscussions = () => {
    const [discussions,setDiscussions] = useState([])
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')


    useEffect(()=>{
        const fetchMyDiscussions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/discussions/user/${userId}`,{
                    headers: {'authToken': token}
                })
                if (response.status === 200){
                    setDiscussions(response.data)
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchMyDiscussions()
    },[token,userId])

    const handleUpdateClick = (id)=> {
        navigate(`/update-discussion/${id}`)
      }

      const handleDeleteClick = async (id) => {
        try {
          const res = await axios.delete(`${API_URL}/api/discussions/${id}`,{
            headers: { 'authToken': token }
          })
          if(res.status === 200) {
            alert('Discussion Deleted Successfully')
            window.location.reload()
          }
        } catch (error) {
          console.log(error)
          alert('Failed to Delete Discussion')
        }
      } 


  return (
    <>
    <Navbar />
    <div className='my-discussions'>
        <h3>My Posts</h3>
        <ul>
        {discussions.map(discussion=>{
            return (
                <>
                <li key = {discussion._id}>{discussion.text}</li>
                <img src = {`${API_URL}/uploads/${discussion.image}`} className='discussion-image'/><br />
                <button onClick={() => handleUpdateClick(discussion._id)}>Update</button><br />
                <button onClick={() => handleDeleteClick(discussion._id)}>Delete</button><br />
                </>
            )
        })}
        </ul>
    </div>
    </>
  )
}

export default MyDiscussions