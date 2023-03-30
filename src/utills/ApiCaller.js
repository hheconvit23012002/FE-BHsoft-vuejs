import API_URL from '../constans/ConfigApi'
import axios from 'axios'

export default function ApiCaller(endpoint, mt = 'GET', body) {
    // console.log(body)
    let token = localStorage.getItem("token")
    let config = {
        method: mt,
        url: API_URL + endpoint,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : "Bearer " + token 
        }
    }
    if (config.method == 'GET' && body !== null) {
        config.params = {
            q: body.q,
            page: body.page,
            field: body.field
        }
    }
    return axios(config)
       
}