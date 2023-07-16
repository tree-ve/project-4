// import { useParams, Link } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import './UserDetailPage.css';
import EventCard from "../../components/EventCard/EventCard"
import * as eventsAPI from '../../utilities/events-api';

export default function UserDetailPage({ user, groups, events, setEvents }) {
    // const { id } = useParams();
    
    // const usersGroups = groups.filter(group => group.users.includes(user._id))
    // const usersEvents = events.filter(event => event.user === user._id)
    const usersEvents = events

    useEffect(function() {
		async function getEvents() {
			// console.log('App useEffect start')
			const events = await eventsAPI.getEvents();
			// categoriesRef.current = [...new Set(events.map(event => event.owner._id))];
			setEvents(events)
			// setEvents(events);
		}
		getEvents();
	}, [setEvents]);

    return (
        <div className="full-detail">
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user._id}</h2>
            <Link to="/events/new" className="link" events={events} setEvents={setEvents} user={user}>Make a new event</Link>
            {/* {usersGroups.map(g => (
                <li key={g._id}>
                    <Link to={`/groups/${g._id}`} className="link" group={g} key={g._id}>{g.title}</Link>
                </li>
            ))} */}
            {/* {console.log(events)} */}
            {/* {console.log(usersEvents)} */}
            <div className="event-list">
                {usersEvents.map(event => (
                    <EventCard event={event} setEvents={setEvents} key={event._id}/>
                ))}
            </div>
        </div>
    )
}