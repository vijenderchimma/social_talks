import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import API_URL from '../Api'

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')

    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/${userId}`, {
                    headers: { 'authToken': token }
                })
                console.log(response.data)
                if (response.status === 200) {
                    setName(response.data.name)
                    setEmail(response.data.email)
                    setMobileNo(response.data.mobileNo)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [token, userId])

    const userUpdateHandler = async (e) => {
        e.preventDefault()
        try {
            const resposne = await axios.put(`${API_URL}/api/users/update/${userId}`,
                { name, email, mobileNo }, {
                headers: {'authToken': token}
            })
            if (resposne.status === 200) {
                alert("User Details Updated Successfully")
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
            alert("Failed to Update")
        }
    }

    return (
        <>
        <Navbar />
        <div>
            <form onSubmit={userUpdateHandler}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <input type="text" placeholder="Mobile" value={mobileNo} onChange={(e) => setMobile(e.target.value)} required /><br />
                <button type="submit">Update User</button>
            </form>
        </div>
        </>
    )
}

export default UpdateUser