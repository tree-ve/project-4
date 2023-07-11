// import NewGroupPage from "../NewGroupPage/NewGroupPage"
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GroupCard from "../../components/GroupCard/GroupCard"
import * as groupsAPI from '../../utilities/groups-api';
// import './MoviesListPage.css';

export default function GroupsListPage({ groups, setGroups }) {
    const categoriesRef = useRef([]);
    const navigate = useNavigate();

    useEffect(function() {
        async function getGroups() {
            const groups = await groupsAPI.getGroups();
            console.log(groups)
            categoriesRef.current = [...new Set(groups.map(group => group.title))];
            setGroups(groups);
            // setActiveCat(categoriesRef.current[0]);
        }
        getGroups();
    }, []);
    return (
        <div>
            <Link to="/groups/new" className="link" groups={groups}>Make a new group</Link>
            <div className="group-list">
                {console.log(groups)}
                <GroupCard groups={groups} />
            </div>
        </div>
    )
}