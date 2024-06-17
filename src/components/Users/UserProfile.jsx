import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../Api'

const UserProfile = () => {
    const [profile,setprofile] = useState({}) 

    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/${userId}`,{
                    headers: {'authToken': token}
                })
                console.log(response.data)
                if(response.status === 200){
                    setprofile(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[token,userId])

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`${API_URL}/api/users/delete/${userId}`,
                {
                    headers: {'authToken': token}
                }
            )
            if(response.status === 200){
                alert("User Deleted Successfully")
                localStorage.removeItem('authToken')
                localStorage.removeItem('userId')
                navigate('/login',{reverse:true})
            }
        } catch (error) {
            console.log(error)
            alert("Failed to Delete user")
        }
    }


    return (
        <>
        <Navbar />
        <div className='user-profile-container'>
            <div>
                <p>{profile.name}</p>
                <p>{profile.email}</p>
                <p>{profile.mobileNo}</p>
            </div>
            <Link to = "/updateuser"><button>Update User</button></Link><br/>
            <Link to = "/myposts"><button>My Posts</button></Link><br/>
            <button onClick={deleteUser}>Delete My Account</button><br/>
        </div>
        </>
    )
}

export default UserProfile