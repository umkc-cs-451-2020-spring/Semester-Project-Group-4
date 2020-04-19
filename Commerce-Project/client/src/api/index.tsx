import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// users
export const createUser = (payload: any) => api.post(`/user`, payload)
export const getUser = (payload: any) => api.post(`/users`, payload)
export const updateUser = (username: string, payload: any) => api.put(`/userUpdate/${username}`, payload)
export const deleteUser = (username: string) => api.delete(`/user/${username}`)
export const getUserById = (username: string) => api.get(`/user/${username}`)

//accounts 
export const createChecking = (payload: any, username: string) => api.post(`/addchecking/${username}`, payload)
export const getChecking = (username: string) => api.get(`/getchecking/${username}`)
export const getCheckingBalance = (username: string) => api.get(`/checkingbalance/${username}`)
export const getLastCheckingTransaction = (username: string) => api.get(`/getlastchecking/${username}`)

export const createSavings = (payload: any, username: string) => api.post(`/addsavings/${username}`, payload)
export const getSavings = (username: string) => api.get(`/getsavings/${username}`)
export const getSavingsBalance = (username: string) => api.get(`/savingsbalance/${username}`)
export const getLastSavingsTransaction = (username: string) => api.get(`/getlastsavings/${username}`)

export const createMoneyMarket = (payload: any, username: string) => api.post(`/addmoneymarket/${username}`, payload)
export const getMoneyMarket = (username: string) => api.get(`/getmoneymarket/${username}`)
export const getMoneyMarketBalance = (username: string) => api.get(`/moneymarketbalance/${username}`)
export const getLastMoneyMarketTransaction = (username: string) => api.get(`/getlastmoneymarket/${username}`)

export const createNotifications = (payload: any, username: string) => api.post(`/addnotifications/${username}`, payload)
export const updateNotifications = (payload: any, username: string) => api.put(`/updatenotifications/${username}`, payload)
export const getNotifications = (username: string) => api.get(`/getnotifications/${username}`)

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
  getMoneyMarketBalance,
  createNotifications,
  updateNotifications,
  getNotifications,
  getLastCheckingTransaction,
  getLastSavingsTransaction,
  getLastMoneyMarketTransaction
}

export default apis