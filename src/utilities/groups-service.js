// Import all named exports attached to a groupsAPI object
// This syntax can be helpful documenting where the methods come from 
// import * as groupsAPI from './groups-api';

// export async function newGroup(groupData) {
//     // Delegate the network request code to the groups-api.js API module
//     // which will ultimately return a JSON Web Token (JWT)
//     // ? const token = await groupsAPI.newGroup(groupData);
//     console.log('groups-service line 9')
//     const group = await groupsAPI.newGroup(groupData);
//     console.log(group)
//     // ? localStorage.setItem('token', token);
//     // ? return getUser();
//     return group;
// }

// export async function getGroups() {
//     const groups = await groupsAPI.getGroups();
//     return groups
// }