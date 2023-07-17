import { useParams, Link } from "react-router-dom"
import './GroupDetailPage.css';
import * as groupsAPI from '../../utilities/groups-api'; 
import * as eventsAPI from '../../utilities/events-api'; 
import * as usersAPI from '../../utilities/users-api'; 
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function GroupDetailPage({ groups, setGroups }) {
    const { id } = useParams();
    // console.log(group)
    const [group, setGroup] = useState(null);
    // console.log(id)
    const [isOpen, setIsOpen] = useState(false);
    // console.log(groups)
    // const group = groups.filter((group) => group._id === id)[0]

    // console.log(id)
    useEffect(() => {
        async function fetchGroup() {
            try {
                // console.log('check 1')
                const groupData = await groupsAPI.getGroupById(id);
                console.log("Group Data.group: ", groupData.group); 
                // console.log('check 2')
                setGroup(groupData.group);
                const groupUsersEvents = []
                console.log(groupData.groupUserEvents)
                const castArrOfArr = groupData.groupUserEvents.map(g => console.log(g))
                console.log(castArrOfArr)
                const castArray2D = [].concat(...castArrOfArr)
                console.log(castArray2D)
                const castSet = new Set(castArray2D);
                console.log(castSet)
                const castArray = Array.from(castSet);
                console.log(castArray)
                // const groupUsers = group.users
                // console.log(groupUsers)
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
    }, [id]);


    const groupUsersEvents2 = [
        { title: 'event 1', start: '2023-07-18', end: '2023-07-20' },
        { title: 'event 2', start: '2023-07-22', end: '2023-07-29' }
    ]


    const handleEdit = async (evt, id) => {
        evt.preventDefault();
        console.log('handleEdit')
        try {
            console.log(id)
            // await groupsAPI.deleteGroup(id);
            // setGroups(groups)
            // navigate('/groups', {groups});
        } catch (error) {
            console.log(error)
            this.setState({ error: "Couldn't Edit Group - Try Again" });
        }
  	}

    return (
        <div className="full-detail">
            {group ? (
                <div key={ group._id }>
                    <div className="full-card">
                        <h2>
                            {group.title}:<br/>{group._id}
                        </h2>
                        <div>
                            <h4>Group Owner: </h4>
                            <p><Link to={`/user/${group.owner._id}`} className="link" user={group.owner._id} key={group.owner._id}>{group.owner.username}</Link></p>
                        </div>
                        
                        <ul>
                            <h4>Members:</h4>
                            {group.users.map(u => (
                                <li key={u._id}>
                                    <Link to={`/user/${u._id}`} className="link" user={u._id} key={u._id}>{u.username}</Link>
                                </li>
                            ))}
                        </ul>
                        <FullCalendar className="calendar"
                            plugins={[ dayGridPlugin ]}
                            firstDay={1}
                            initialView="dayGridMonth"
                            events={groupUsersEvents2}
                        />
                    </div>
                    <button className="initialDeleteBtn" onClick={() => setIsOpen(true)}>DELETE</button>
                    {isOpen && <DeleteModal group={group} setIsOpen={setIsOpen} />}
                    <button onClick={(evt) => handleEdit(evt, group._id)}>EDIT</button>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}