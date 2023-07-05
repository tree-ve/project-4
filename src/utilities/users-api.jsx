// This is the base path of the Express route we'll define
// This file should only contain AJAX helper methods
import sendRequest from './send-request';
const BASE_URL = '/api/users';

// export async function signUp(userData) {
//     console.log('signUp check')
//     console.log(BASE_URL)
//     const res = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData)
//     });
//     console.log(res)
//     if (res.ok) {
//         console.log('res.ok')
//         return await res.json();
//     } else {
//         console.log('res not ok')
//         throw new Error('Invalid Sign Up');
//     }
// }

// export async function login(userData) {
//     console.log('login check')
//     const res = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData)
//     });
//     console.log(res.body, res.ok, res.headers)
//     if (res.ok) {
//         console.log('res.ok')
//         return await res.json();
//     } else {
//         console.log('res not ok')
//         throw new Error('Invalid Login');
//     }
// }

export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}
  
export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}