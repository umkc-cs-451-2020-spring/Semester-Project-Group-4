import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// users
export const createUser = (payload: any) => api.post(`/user`, payload)
export const getUser = (payload: any) => api.post(`/users`, payload)
export const updateUser = (id: string, payload: any) => api.put(`/user/${id}`, payload)
export const deleteUser = (id: string) => api.delete(`/user/${id}`)
export const getUserById = (username: string) => api.get(`/user/${username}`)

//accounts 
export const createChecking = (payload: any) => api.post(`/checking`, payload)
export const getChecking = () => api.get(`/checkings`)
export const getCheckingBalance = () => api.get(`/checkingtotal`)

export const createSavings = (payload: any) => api.post(`/saving`, payload)
export const getSavings = () => api.get(`/savings`)
export const getSavingsBalance = () => api.get(`/savingstotal`)

export const createMoneyMarket = (payload: any) => api.post(`/moneymarket`, payload)
export const getMoneyMarket = () => api.get(`/moneymarkets`)
export const getMoneyMarketBalance = () => api.get(`/moneymarkettotal`)

const apis = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  createChecking,
  getChecking,
  getCheckingBalance,
  createSavings,
  getSavings,
  getSavingsBalance,
  createMoneyMarket,
  getMoneyMarket,
  getMoneyMarketBalance
}

export default apis