import './App.css';
// import { useState, useEffect, useRef } from 'react';
import { useState, useEffect } from 'react';
// import { movies } from "../../data.js";

// Router
// import { Routes, Route, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
// Add the following import
import { getUser, checkToken } from '../../utilities/users-service';
import * as groupsAPI from '../../utilities/groups-api';
// import * as eventsAPI from '../../utilities/events-api';

// Custom Components
import NavBar from '../../components/NavBar/NavBar'
// import ActorListPage from '../ActorListPage/ActorListPage'
// import ActorDetailPage from '../ActorDetailPage/ActorDetailPage'
// import MovieDetailPage from '../MovieDetailPage/MovieDetailPage'
// import MoviesListPage from '../MoviesListPage/MoviesListPage'
import LogInPage from '../LogInPage/LogInPage'
import UserDetailPage from '../UserDetailPage/UserDetailPage'
import GroupsListPage from '../GroupsListPage/GroupsListPage'
import GroupDetailPage from '../GroupDetailPage/GroupDetailPage'
import NewGroupPage from '../NewGroupPage/NewGroupPage'
import NewEventPage from '../NewEventPage/NewEventPage';

export default function App() {

	const [user, setUser] = useState(getUser());

	// const [groups, setGroups] = useState(getGroups());
	const [groups, setGroups] = useState([]);
	// const categoriesRef = useRef([]);
	// const navigate = useNavigate();

	const [events, setEvents] = useState([]);

    useEffect(function() {
        async function getGroups() {
            // console.log('App useEffect start')
            const groups = await groupsAPI.getGroups();
            // categoriesRef.current = [...new Set(groups.map(group => group.owner._id))];
            setGroups(groups)
            // setGroups(groups);
        }
        getGroups();
    }, [setGroups]);

	// useEffect(function() {
	// 	async function getEvents() {
	// 		// console.log('App useEffect start')
	// 		const events = await eventsAPI.getEvents();
	// 		// categoriesRef.current = [...new Set(events.map(event => event.owner._id))];
	// 		setEvents(events)
	// 		// setEvents(events);
	// 	}
	// 	getEvents();
	// }, [setEvents]);

	const [authPage, setAuthPage] = useState()

	// const castArrOfArr = movies.map(m => m.cast)
	// const castArray2D = [].concat(...castArrOfArr)
	// const castSet = new Set(castArray2D);
	// const castArray = Array.from(castSet);

	// const usersGroups = groups.filter(group => group.users.includes(user._id))
	// console.log('usersGroups', usersGroups)

	async function handleCheckToken() {
		const expDate = await checkToken()
		console.log(expDate)
	}

	return (
		<main className="App">
			{ user ?
				<>
					<NavBar user={user} setUser={setUser} handleCheckToken={handleCheckToken}/>
					<Routes>
						{/* USER ROUTES */}
						{/* <Route path="/user/:id" element={<UserDetailPage user={user} groups={groups} events={events} setEvents={setEvents}/>} /> */}
						<Route path="/user/:id" element={<UserDetailPage events={events} setEvents={setEvents}/>} />
						{/* GROUP ROUTES */}
						<Route path="/groups" element={<GroupsListPage groups={groups} setGroups={setGroups}/>} />
						<Route path="/groups/:id" element={<GroupDetailPage groups={groups} setGroups={setGroups} user={user}/>} />
						<Route path="/groups/new" element={<NewGroupPage groups={groups} setGroups={setGroups} user={user}/>} />
						{/* EVENT ROUTES */}
						<Route path="/events/new" element={<NewEventPage events={events} setEvents={setEvents} user={user}/>} />
					</Routes>
                </>
				:
				<>
					<button className="btn" onClick={() => setAuthPage(!authPage)}>{ authPage ? 'Existing user? Log In!': 'New user? Create an account!' }</button>
					<LogInPage user={user} setUser={setUser} authPage={authPage}/>
				</>
			}
		</main>
	);
}