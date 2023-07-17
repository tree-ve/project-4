// import NewGroupPage from "../NewGroupPage/NewGroupPage"
// import { useState, useEffect, useRef } from 'react';
import { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GroupCard from "../../components/GroupCard/GroupCard"
import * as groupsAPI from '../../utilities/groups-api';
import './GroupsListPage.css';

export default function GroupsListPage({ groups, setGroups }) {
    // const categoriesRef = useRef([]);

    useEffect(function() {
        async function getGroups() {
            // console.log('GroupsListPage useEffect start')
            const groups = await groupsAPI.getGroups();
            // setGroups(groups)
            // categoriesRef.current = [...new Set(groups.map(group => group.owner._id))];
            setGroups(groups);
        }
        getGroups();
    }, [setGroups]);
    
    return (
        <div>
            <Link to="/groups/new" className="link" groups={groups}>Make a new group</Link>
            <div className="group-list">
                {/* {console.log(groups)} */}
                <GroupCard groups={groups} />
            </div>
        </div>
    )
}