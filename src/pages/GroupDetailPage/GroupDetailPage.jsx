import { useParams } from "react-router-dom"
import './GroupDetailPage.css';
import * as groupsAPI from '../../utilities/groups-api'; 
import { useState, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditGroupModal from "../../components/EditGroupModal/EditGroupModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MemberList from "../../components/MemberList/MemberList";

export default function GroupDetailPage({ user }) {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [groupEvents, setGroupEvents] = useState(null);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [updatedMembers, setUpdatedMembers] = useState([]);
    const [showMembers, setShowMembers] = useState(false)
    
    useEffect(() => {
        async function fetchGroup() {
            try {
                const groupData = await groupsAPI.getGroupById(id);
                setGroup(groupData.group);
                const groupUsersEvents = [].concat(...groupData.groupUserEvents)
                setGroupEvents(groupUsersEvents)
            } catch (error) {
                console.error(error);
            }
        }
        try {
            fetchGroup();
        } catch (error) {
            console.error(error)
        }
    }, [id, editIsOpen, updatedMembers]);

    useEffect(() => {
        setIsOwner(user._id === (group?.owner?._id));
    }, [user, group]);

    return (
        <div className="full-detail">
            {group ? (
                <div key={ group._id }>
                    <div className="full-card">
                        <h2>
                            {group.title}
                        </h2>                        
                        <ul className="memberList">
                            <h4 className="showMembersBtn" onClick={() => setShowMembers(!showMembers)}>Members</h4>
                            {showMembers && <MemberList className="showMembers" group={group} isOwner={isOwner} updatedMembers={updatedMembers} setUpdatedMembers={setUpdatedMembers} />}
                        </ul>
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