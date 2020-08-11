import { get } from 'axios'

const base_url = 'http://localhost:3000/'
const resource = 'glasses'
const request_url = `${base_url}${resource}`

function getGlasses(start, limit){
    const config = {
        params: {
            start,
            limit
        }
    }
    return get(`${request_url}`, config)
}

function getGlass(id){
    return get(`${request_url}/${id}`)
}


export {
    getGlasses,
    getGlass
}