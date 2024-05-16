import axios from 'axios'
import {getAuth} from "firebase/auth";

const base_url = 'http://localhost:3000'

function setHeaders(contentType, token = null) {
	let config = {}
	let content = (value) => {
		switch (value) {
			case 'json':
				return 'application/json'
			case 'x-www-form-urlencoded':
				return 'application/x-www-form-urlencoded'
			case 'form-data':
				return 'multipart/form-data'
		}
	}
	if (token) {
		config = {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': content(contentType),
			}
		}
	} else {
		config = {
			headers: {
				'Content-Type': content(contentType),
			}
		}
	}
	return config;
}

function getAll(endpoint, isToken = false) {
	let config;
	if (isToken == true) {
		config = setHeaders('json', localStorage.getItem('token'))
	} else {
		config = setHeaders('json')
	}
	return axios.get(`${base_url}/${endpoint}`, config)
}

function patch(endpoint, id = null, data, isToken = false, form_data = false) {
	let config;
	if (isToken == true) {
		config = setHeaders(form_data ? 'form-data' : 'json', localStorage.getItem('token'))
	} else {
		config = setHeaders(form_data ? 'form-data' : 'json')
	}
	if (id) {
		return axios.patch(`${base_url}/${endpoint}/${id}`, data, config)
	} else {
		return axios.patch(`${base_url}/${endpoint}`, data, config)
	}
}

function post(endpoint, data, isToken = false) {
	let config;
	if (isToken == true) {
		config = setHeaders('json', localStorage.getItem('token'))
	} else {
		config = setHeaders('json')
	}
	return axios.post(`${base_url}/${endpoint}`, data, config)
}

function delete_(endpoint, id, isToken = false) {
	let config;
	if (isToken == true) {
		config = setHeaders('json', localStorage.getItem('token'))
	} else {
		config = setHeaders('json')
	}
	return axios.delete(`${base_url}/${endpoint}/${id}`, config)
}

function get(endpoint, isToken = false) {
	let config;
	if (isToken == true) {
		config = setHeaders('json', localStorage.getItem('token'))
	} else {
		config = setHeaders('json')
	}
	return axios.get(`${base_url}/${endpoint}`, config)
}

/**
 * @description
 * The Get function is used to make a GET request to a given endpoint.
 * @param {Object} options - The options object.
 * @param {string} options.endpoint - The endpoint to make the request to.
 * @param {boolean} options.useToken - If the request should use a token.
 * @param {'json'|'x-www-form-urlencoded'|'form-data'} [options.contentType = 'json'] - The content type of the request.
 * @return {Promise<any>}
 */
async function Get({endpoint, useToken, contentType = 'json'}) {
	let config = useToken ?
		setHeaders(contentType, await getAuth().currentUser.getIdToken()) :
		setHeaders(contentType)
	return axios.get(`${base_url}/${endpoint}`, config)
}

/**
 * @description
 * The Post function is used to make a POST request to a given endpoint.
 * @param {Object} options - The options object.
 * @param {string} options.endpoint - The endpoint to make the request to.
 * @param {Object} options.data - The data to be sent in the request.
 * @param {boolean} options.useToken - If the request should use a token.
 * @param {'json'|'x-www-form-urlencoded'|'form-data'} [options.contentType = 'json'] - The content type of the request.
 * @return {Promise<any>}
 */
async function Post({endpoint, data, useToken, contentType = 'json'}) {
	let config = useToken ?
		setHeaders(contentType, await getAuth().currentUser.getIdToken()) :
		setHeaders(contentType)
	return axios.post(`${base_url}/${endpoint}`, data, config)
}

/**
 * @description
 * The Patch function is used to make a PATCH request to a given endpoint.
 * @param {Object} options - The options object.
 * @param {string} options.endpoint - The endpoint to make the request to.
 * @param {Object} options.data - The data to be sent in the request.
 * @param {boolean} options.useToken - If the request should use a token.
 * @param {'json'|'x-www-form-urlencoded'|'form-data'} [options.contentType = 'json'] - The content type of the request.
 * @return {Promise<any>}
 */
async function Patch({endpoint, data, useToken, contentType = 'json'}) {
	let config = useToken ?
		setHeaders(contentType, await getAuth().currentUser.getIdToken()) :
		setHeaders(contentType)
	return axios.patch(`${base_url}/${endpoint}`, data, config)
}


/**
 * @description
 * The Delete function is used to make a DELETE request to a given endpoint.
 * @param {Object} options - The options object.
 * @param {string} options.endpoint - The endpoint to make the request to.
 * @param {boolean} options.useToken - If the request should use a token.
 * @param {'json'|'x-www-form-urlencoded'|'form-data'} [options.contentType = 'json'] - The content type of the request.
 * @return {Promise<any>}
 */
async function Delete({endpoint, useToken, contentType = 'json'}) {
	let config = useToken ?
		setHeaders(contentType, await getAuth().currentUser.getIdToken()) :
		setHeaders(contentType)
	return axios.delete(`${base_url}/${endpoint}`, config)
}

export {
	getAll,
	patch,
	post,
	delete_,
	get,
	Patch,
	Post,
	Get,
	Delete
}
