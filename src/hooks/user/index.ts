import { cleanedLink } from '../../utils/format-url'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import IUser from './user.interface'
import { userSchema } from './domain'
import axios from 'axios'

const API_ENDPOINT_URL = 'http://localhost:8080/api'
// const API_ENDPOINT_URL = 'https://price-comparison.site/api'

export default function useUser() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [users, setUsers] = useState<IUser[]>([])
    const [user, setUser] = useState<IUser | null>(null)

    const accessToken = localStorage.getItem('accessToken')

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get<IUser[]>(`${API_ENDPOINT_URL}/auth/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setUsers(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchUser = async (id: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IUser>(`${API_ENDPOINT_URL}/auth/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setUser(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    // const handleDelete = async (id: string) => {
    //     await deleteUser(setLoading, setError, setSuccess, id)
    // }

    return {
        loading,
        error,
        success,
        users,
        user,
        fetchUsers,
        fetchUser,
    }
}
