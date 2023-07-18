// This is the base path of the Express route we'll define
// This file should only contain AJAX helper methods
import sendRequest from './send-request';
const BASE_URL = '/api/groups';

export async function newGroup(groupData) {
    // console.log('groups-api newGroup()')
    return sendRequest(`${BASE_URL}/new`, 'POST', groupData);
}
  
export async function getGroups() {
    // console.log('groups-api getGroups()')
    return sendRequest(BASE_URL);
}

export async function getGroupById(id) {
    // console.log('groups-api getGroupById()', id)
    return sendRequest(`${BASE_URL}/${id}`);
}

export async function deleteGroup(id) {
    // console.log(`groups-api deleteGroup(${id})`)
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function editGroup(id, groupData) {
    // console.log(`groups-api editGroup(${id}) -> ${groupData}`)
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', groupData);
}
