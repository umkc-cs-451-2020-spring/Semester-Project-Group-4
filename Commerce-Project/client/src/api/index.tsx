import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const createUser = (payload: any) => api.post(`/user`, payload)
export const getUser = (payload: any) => api.post(`/users`, payload)
export const updateUser = (id: string, payload: any) => api.put(`/user/${id}`, payload)
export const deleteUser = (id: string) => api.delete(`/user/${id}`)
export const getUserById = (username: string) => api.get(`/user/${username}`)

const apis = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
}

export default apis