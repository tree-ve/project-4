// import { useParams, Link } from "react-router-dom"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './UserDetailPage.css';
import EventCard from "../../components/EventCard/EventCard"
import * as eventsAPI from '../../utilities/events-api';
import {showUser} from '../../utilities/users-api';

// export default function UserDetailPage({ user, groups, events, setEvents }) {
// export default function UserDetailPage({ events, setEvents }) {
export default function UserDetailPage() {
    const { id } = useParams();
    // console.log(id, 'id')
    const [user, setUser] = useState(getUser());
    // const user = useState(getUser());
    // console.log('events', events)
    // const [user, setUser] = useState(showUser(id));
    const [userPage, setUserPage] = useState(null);
    const [events, setEvents] = useState([]);
    const [pageEvents, setPageEvents] = useState([]);
    
    const [isUser, setIsUser] = useState(false);
    // console.log(user._id, 'user._id')
    // const usersEvents = events.filter(event => event.owner._id === id);

    useEffect(() => {
        async function fetchUser() {
            try {
                const shownUser = await showUser(id)
                setEvents([])
                // console.log('events 1', events)
                // console.log('shownUser.events', shownUser.events)
                setUserPage(shownUser.user)
                setPageEvents(shownUser.events)
                // console.log('user', user)
                // console.log('events 2', events)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [id]);

    useEffect(() => {
        setIsUser(user && id === (user._id));
        // console.log(user)
        // console.log(id)
        // console.log(user._id)
    }, [id, user]);

    useEffect(function() {
		async function fetchEvents() {
			try {
                const eventsData = await eventsAPI.getEvents();
                setEvents(eventsData);
                // console.log(events)
            } catch (error) {
                console.error(error);
            }
		}
		fetchEvents();
	}, [setEvents]);

    // useEffect(() => {
    //     async function checkUser() {
    //         try {
    //             if (id === user._id) {
    //                 console.log(id, user._id, 'match')
    //                 setIsUser(true)
    //             } else {
    //                 console.log(id, user._id, 'different')
    //                 setIsUser(false)
    //             }
    //             console.log(isUser)
    //         } catch (error) {
    //             console.error(error)
    //         }
	// 	}
    //     try {
    //         checkUser();
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }, [id, isUser]);

    // if (!user) {
    //     // Render a loading state while the user data is being fetched
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {!userPage ? (
                <div className="full-detail">
                    <h2>Loading...</h2>
                </div>
            ) : (
                <div className="full-detail">
                    {/* {console.log(userPage.user)} */}
                    {/* {currentUser = userPage.user} */}
                    <h2>{userPage.username}</h2>
                    <h2>{userPage.email}</h2>
                    {/* <h2>{userPage._id}</h2> */}
                    {isUser && (
                        <Link to="/events/new" className="link" events={events} setEvents={setEvents} user={user}>
                            Make a new event
                        </Link>
                    )}
                    <div className="event-list">
                        {pageEvents ? (
                            pageEvents.map(event => (
                                <EventCard event={event} setEvents={setEvents} isUser={isUser} key={event._id}/>
                            ))
                        ) : (
                            <div className="full-detail">
                                <h2>Loading...</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}