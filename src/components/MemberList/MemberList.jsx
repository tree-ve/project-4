import { Link } from "react-router-dom"
import * as groupsAPI from '../../utilities/groups-api'; 


export default function MemberList({ group, isOwner, updatedMembers, setUpdatedMembers }) {

    async function removeUser(evt, removedUser) {
        console.log("removeUser Function")
        evt.preventDefault()
        console.log(removedUser)
        try {
            console.log(group.users)
            // const newUserList = group.users.findIndex(user => user._id === removedUser._id)
            // console.log(newUserList)

            setUpdatedMembers(group.users)
            const updatedGroupUsers = group.users

            console.log(updatedGroupUsers)
            const userIdx = updatedGroupUsers.findIndex(user => user._id === removedUser._id)
            if (userIdx > -1) {
                updatedGroupUsers.splice(userIdx, 1)
            }
            // console.log(group.users)
            console.log(updatedGroupUsers)
            console.log(group._id)
            console.log(group)
            group.users = updatedGroupUsers
            await groupsAPI.editGroup(group._id, group);
            // const editGroupData = await groupsAPI.editGroup(group._id, group);
            // console.log(editGroupData)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            {/* {console.log(groups)} */}
            {group.users.map(u => (
                <div className="userListItem" key={u._id}>
                    <Link to={`/user/${u._id}`} className="link" user={u._id} key={u._id}>{u.username}</Link>
                    {/* {console.log(isOwner)} */}
                    {isOwner ? (
                        (group.owner._id === u._id) ? (
                            <></>
                        ) : (
                            <button className="removeUser" onClick={(evt) => removeUser(evt, u)}>X</button>
                        )
                        ) : (<></>)}
                </div>
            ))}
        </>
    )
}