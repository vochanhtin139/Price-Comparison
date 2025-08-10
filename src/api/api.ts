import axios from 'axios'

// const API_BASE_URL = 'http://localhost:8080/api'
const API_BASE_URL = 'http://localhost:8080/api'

export const getAllShops = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shops`)
        return response.data
    } catch (error) {
        console.error('Error fetching shops', error)
        throw error
    }
}

export const createShop = async (shop: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/shops`, shop)
        return response.data
    } catch (error) {
        console.error('Error creating shop', error)
        throw error
    }
}
