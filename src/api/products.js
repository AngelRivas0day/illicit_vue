import { get } from 'axios'

const base_url = 'http://localhost:3000/'
const resource = 'glasses'
const request_url = `${base_url}${resource}`

function getGlasses(filters){
    let {
        start, 
        end, 
        category, 
        max, 
        min, 
        lenseMaterial, 
        frameMaterial, 
        query,
        brand
    } = filters
    console.log("filters: ", filters)
    const config = {
        params: {
            query,
            start,
            end,
            category,
            max,
            min,
            lenseMaterial,
            frameMaterial,
            brand
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