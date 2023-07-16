// This is the base path of the Express route we'll define
// This file should only contain AJAX helper methods
import sendRequest from './send-request';
const BASE_URL = '/api/events';

export async function newEvent(eventData) {
    // console.log('events-api newEvent()')
    return sendRequest(`${BASE_URL}/new`, 'newEvent', 'POST', eventData);
}
  
export async function getEvents() {
    // console.log('events-api getEvents()')
    return sendRequest(BASE_URL, 'getEvents');
}

export async function getEventById(id) {
    // console.log('events-api getEventById()')
    return sendRequest(`${BASE_URL}/${id}`, 'getEventsById');
}

export async function deleteEvent(id) {
    console.log(`events-api deleteEvent(${id})`)
    return sendRequest(`${BASE_URL}/${id}`, 'deleteEvent', 'DELETE');
}
