import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// users
export const createUser = (payload: any) => api.post(`/user`, payload)
export const getUser = (payload: any) => api.post(`/users`, payload)
export const updateUser = (id: string, payload: any) => api.put(`/user/${id}`, payload)
export const deleteUser = (id: string) => api.delete(`/user/${id}`)
export const getUserById = (id: string) => api.get(`/user/${id}`)

//accounts 
export const createChecking = (payload: any) => api.post(`/user`, payload)
export const getChecking = () => api.post(`/user`)
export const createSavings = (payload: any) => api.post(`/user`, payload)
export const getSavings = () => api.post(`/user`)
export const createMoneyMarket = (payload: any) => api.post(`/user`, payload)
export const getMoneyMarket = () => api.post(`/user`)

const apis = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  createChecking,
  getChecking,
  createSavings,
  getSavings,
  createMoneyMarket,
  getMoneyMarket
}

export default apis