import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    console.log(url, method, payload)
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    // console.log('1', url, options)
    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('url: ', url)
    // console.log('options: ', options)
    const res = await fetch(url, options);
    // console.log('options.headers: ', options.headers)
    // console.log('options.body: ', options.body)
    // console.log('res: ', res)
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) {
        // console.log('Function -> ', functionName)
        // console.log('res:ok! -> res: ', res)
        return res.json();
    }
    throw new Error('Bad Request');
}