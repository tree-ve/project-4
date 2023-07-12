// This is the base path of the Express route we'll define
// This file should only contain AJAX helper methods
import sendRequest from './send-request';
const BASE_URL = '/api/groups';

export async function newGroup(groupData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', groupData);
}
  
export async function getGroups() {
    return sendRequest(BASE_URL);
}

export async function getGroupById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

// export function login(credentials) {
//     return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
// }

// export function checkToken() {
//     return sendRequest(`${BASE_URL}/check-token`);
// }