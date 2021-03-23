import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // signin user
    const login = async (email, password) => {
        setError(null)
        setLoading(true)
        try {
            const {data} = await axios.post('/api/users/signin', {email, password}, config)
            setUser(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // signup user
    const register = async (name, email, password) => {
        setError(null)
        setLoading(true)
        try {
            const { data } = await axios.post('/api/users/signup', {name, email, password}, config)
            setUser(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // signout user
    const logout = async () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    // update user profile
    const updateUserProfile = async (name, email, password) => {
        setUpdateSuccess(false)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const { data } = await axios.put('/api/users/profile', 
                                            {name, email, password}, 
                                            customConfig)
            setUser(data)
            setUpdateSuccess(true)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // list users
    const listUsers = async () => {
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.get('/api/users', customConfig)
            setUsers(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    return (
        <UserContext.Provider 
            value={{
                user, 
                users, 
                error, 
                updateSuccess,
                loading,
                login, 
                register, 
                logout, 
                updateUserProfile, 
                listUsers
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
