import { cleanedLink } from '../../utils/format-url'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import IUser, { AddAdminOptions } from './user.interface'
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

    const addAdmin = async (data: AddAdminOptions) => {
        const body = {
            username: data.adminUsername,
            email: data.adminEmail,
            firstName: data.adminFirstName,
            lastName: data.adminLastName,
            password: data.adminPassword
        }
        try {
            setLoading(true)
            const response = await axios.post(`${API_ENDPOINT_URL}/auth/add-admin`, body, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess(response.data)
            setError(null)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data || err)
            setSuccess(null)
            setLoading(false)
        }
    }

    const deleteUser = async (id: string) => {
        console.log('Access Token:', accessToken)
        try {
            setLoading(true)
            const response = await axios.delete(`${API_ENDPOINT_URL}/auth/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess(response.data)
            setError(null)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data || err)
            setSuccess(null)
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        success,
        users,
        user,
        fetchUsers,
        fetchUser,
        addAdmin,
        deleteUser
    }
}
