// axios helpers
import axios from 'axios'

axios.$get = (...args) => {
    //console.log('GET:', ...args)
    return axios.get(...args).then(result => result.data)
}
axios.$post = (...args) => {
    //console.log('POST:', ...args)
    return axios.post(...args).then(result => result.data)
}
axios.$put = (...args) => axios.put(...args).then(result => result.data)
axios.$delete = (...args) => axios.delete(...args).then(result => result.data)

export const $axios = axios
