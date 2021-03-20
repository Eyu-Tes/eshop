import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // signin user
    const login = async (email, password) => {
        setUser(null)
        setError(null)
        setLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
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
    const register = () => {

    }

    // signout user
    const logout = () => {

    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider 
            value={{
                user, 
                error, 
                loading,
                login, 
                register, 
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
