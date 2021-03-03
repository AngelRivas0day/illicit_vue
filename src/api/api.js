import * as Axios from 'axios'
const base_url = 'http://localhost:3000'

// function toSimpleFormData(data){
//     const formData = new FormData()
//     for (const key of Object.keys(data)) {
//         const value = data[key];
//         if (value != null) {
//           formData.append(key, value);
//         }
//     }
//     return formData
// }

function setHeaders(contentType, token = null){
    let config = {}
    let content = (value) => {
        switch (value){
            case 'json':
                return 'application/json'
            case 'x-www-form-urlencoded':
                return 'application/x-www-form-urlencoded'
            case 'form-data':
                return 'multipart/form-data'
        }
    }
    if(token){
        config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': content(contentType)
            }
        }
    }else{
        config = {
            headers: {
                'Content-Type': content(contentType)
            }
        }
    }
    return config;
}

function getOne(endpoint, id, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.get(`${base_url}/${endpoint}/${id}`, config)
}

function getAll(endpoint, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.get(`${base_url}/${endpoint}`, config)
}

function patch(endpoint, id = null, data, isToken = false, form_data = false){
    var config;
    if(isToken == true){
        config = setHeaders(form_data ? 'form-data' : 'json', localStorage.getItem('token'))
    }else{
        config = setHeaders(form_data ? 'form-data' : 'json')
    }
    if(id){
        return Axios.patch(`${base_url}/${endpoint}/${id}`, data, config)
    }else{
        return Axios.patch(`${base_url}/${endpoint}`, data, config)
    }
}

function post(endpoint, data, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.post(`${base_url}/${endpoint}`, data, config)
}

function delete_(endpoint, id, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.delete(`${base_url}/${endpoint}/${id}`, config)
}

function get(endpoint, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.get(`${base_url}/${endpoint}`, config) 
}

const Post = (endpoint, data, useToken = false, formData = false) => {
    var config;
    if(useToken == true){
        config = setHeaders(formData ? 'form-data' : 'json', localStorage.getItem('token'))
    }else{
        config = setHeaders(formData ? 'form-data' : 'json')
    }
    return Axios.post(`${base_url}/${endpoint}`, data, config)
}

const  Patch = (endpoint, data, useToken = false, formData = false) => {
    var config;
    if(useToken == true){
        config = setHeaders(formData ? 'form-data' : 'json', localStorage.getItem('token'))
    }else{
        config = setHeaders(formData ? 'form-data' : 'json')
    }
    return Axios.patch(`${base_url}/${endpoint}`, data, config)
}

export {
    getOne,
    getAll,
    patch,
    post,
    delete_,
    get,
    Patch,
    Post
}