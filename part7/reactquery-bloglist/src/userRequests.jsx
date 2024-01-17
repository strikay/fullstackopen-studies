import axios from "axios"
const baseUrl =  'http://localhost:3003/api/users'

export const getUsers = () => {
    return axios.get(baseUrl).then(res => res.data)
}