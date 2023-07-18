import { useParams, Link } from "react-router-dom"
import './GroupDetailPage.css';
import * as groupsAPI from '../../utilities/groups-api'; 
// import * as eventsAPI from '../../utilities/events-api'; 
// import * as usersAPI from '../../utilities/users-api'; 
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditGroupModal from "../../components/EditGroupModal/EditGroupModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function GroupDetailPage({ groups, setGroups, user }) {
    const { id } = useParams();
    // console.log(group)
    const [group, setGroup] = useState(null);
    const [groupEvents, setGroupEvents] = useState(null);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [updatedBullshit, setUpdatedBullshit] = useState([]);
    const [newUserData, setNewUserData] = useState({
        addedUserEmail: ''
    });
    const [error, setError] = useState('');
    
    useEffect(() => {
        async function fetchGroup() {
            try {
                // console.log('check 1')
                const groupData = await groupsAPI.getGroupById(id);
                // console.log("Group Data.group: ", groupData.group); 
                // console.log('check 2')
                setGroup(groupData.group);
                // console.log(groupData.groupUserEvents)
                const groupUsersEvents = [].concat(...groupData.groupUserEvents)
                // console.log('1', groupUsersEvents)
                setGroupEvents(groupUsersEvents)
            } catch (error) {
                // Handle error if needed
                console.error(error);
            }
        }
        try {
            fetchGroup();
        } catch (error) {
            console.error(error)
        }
    }, [id, editIsOpen, newUserData, updatedBullshit]);

    // console.log('user', user)
    // console.log('group.owner', group.owner)

    useEffect(() => {
        // setIsOwner(user._id === (group.owner._id));
        setIsOwner(user._id === (group?.owner?._id));
        // console.log(isOwner)
        // console.log(user._id)
        // console.log(group.owner._id)
        // console.log(user._id)
    }, [user, group]);

    function handleChange(evt) {
        const newAddedUserEmail = { ...newUserData, [evt.target.name]: evt.target.value }
        console.log(newAddedUserEmail)
        setNewUserData({ ...newUserData, [evt.target.name]: evt.target.value });
        // console.log(credentials)
        setError('');
    }

    async function removeUser(evt, removedUser) {
        console.log("removeUser Function")
        evt.preventDefault()
        console.log(removedUser)
        try {
            console.log(group.users)
            // const newUserList = group.users.findIndex(user => user._id === removedUser._id)
            // console.log(newUserList)

            setUpdatedBullshit(group.users)
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

    async function addNewUser(evt) {
        evt.preventDefault()
        console.log('addNewUser Function')
        try {
            console.log(group.users)
            console.log(newUserData)
            // group.addedUserEmail = newUserData.addedUserEmail
            // console.log('group -> ', group)
            // setNewUserData(group)
            // console.log('newUserData -> ', newUserData)
            const updatedGroup = { ...group };
            console.log('1', updatedGroup)
            updatedGroup.addedUserEmail = newUserData.addedUserEmail;
            console.log('2', updatedGroup)
            // updatedGroup.users.push({ email: newUserData.addedUserEmail });
            // console.log('3', updatedGroup)
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const editGroupData = await groupsAPI.editGroup(group._id, updatedGroup);
            // // const newGroups = [...groups, group];
            console.log('editGroupData -> ', editGroupData)
            // group.addedUserEmail = ''
            setNewUserData({
                addedUserEmail: ''
            });
            // setNewUserData({});
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="full-detail">
            {group ? (
                <div key={ group._id }>
                    <div className="full-card">
                        <h2>
                            {group.title}
                        </h2>
                        {/* <div>
                            <h4>Group Owner: </h4>
                            <p><Link to={`/user/${group.owner._id}`} className="link" user={group.owner._id} key={group.owner._id}>{group.owner.username}</Link></p>
                        </div> */}
                        
                        <ul className="memberList">
                            <h4>Members:</h4>
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
                            <div>
                                {isOwner ? (
                                    <form className="newUserForm" onSubmit={(evt) => addNewUser(evt)}>
                                        <input className="newUser" placeholder="Add user email" name="addedUserEmail" value={newUserData.addedUserEmail} type="text" onChange={handleChange} autoComplete="off"/>
                                        <button className="newUserSubmit" type="submit">Submit</button>
                                    </form>
                                ) : (<></>)}
                            </div>
                        </ul>
                        {/* {console.log(groupEvents)} */}
                        <FullCalendar className="calendar"
                            plugins={[ dayGridPlugin ]}
                            firstDay={1}
                            initialView="dayGridMonth"
                            events={groupEvents}
                        />
                    </div>
                    {isOwner ? (
                        <>
                            <button className="initialDeleteBtn" onClick={() => setDeleteIsOpen(true)}>DELETE</button>
                            {deleteIsOpen && <DeleteModal group={group} setDeleteIsOpen={setDeleteIsOpen} />}
                            <button className="initialEditBtn" onClick={() => setEditIsOpen(true)}>EDIT</button>
                            {editIsOpen && <EditGroupModal group={group} setEditIsOpen={setEditIsOpen} />}
                        </>
                    ) : (
                        <></>
                    )}
                    
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}