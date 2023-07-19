import { Link } from "react-router-dom"
import { useState } from "react";
import * as groupsAPI from '../../utilities/groups-api'; 


export default function MemberList({ group, isOwner, updatedMembers, setUpdatedMembers }) {

    const [newUserData, setNewUserData] = useState({
        addedUserEmail: ''
    });

    const [error, setError] = useState('');
    
    function handleChange(evt) {
        setNewUserData({ ...newUserData, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function removeUser(evt, removedUser) {
        console.log("removeUser Function")
        evt.preventDefault()
        try {
            setUpdatedMembers(group.users)
            const updatedGroupUsers = group.users
            const userIdx = updatedGroupUsers.findIndex(user => user._id === removedUser._id)
            if (userIdx > -1) {
                updatedGroupUsers.splice(userIdx, 1)
            }
            group.users = updatedGroupUsers
            await groupsAPI.editGroup(group._id, group);
        } catch (error) {
            console.error(error)
        }
    }

    async function addNewUser(evt) {
        evt.preventDefault()
        console.log('addNewUser Function')
        try {
            console.log(newUserData)
            await groupsAPI.editGroup(group._id, newUserData);
            setUpdatedMembers(group.users)
            setNewUserData({
                addedUserEmail: ''
            });
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            {group.users.map(u => (
                <div className="userListItem" key={u._id}>
                    <Link to={`/user/${u._id}`} className="link" user={u._id} key={u._id}>{u.username}</Link>
                    {isOwner ? (
                        (group.owner._id === u._id) ? (
                            <></>
                        ) : (
                            <button className="removeUser" onClick={(evt) => removeUser(evt, u)}>X</button>
                        )
                        ) : (
                        <></>
                    )}
                </div>
            ))}
            <div>
                {isOwner ? (
                    <form className="newUserForm" onSubmit={(evt) => addNewUser(evt)}>
                        <input className="newUser" placeholder="Add user email" name="addedUserEmail" value={newUserData.addedUserEmail} type="text" onChange={handleChange} autoComplete="off"/>
                        <button className="newUserSubmit" type="submit">Submit</button>
                    </form>
                ) : (<></>)}
            </div>
        </>
    )
}