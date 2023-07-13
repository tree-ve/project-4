import './App.css';
// import { useState, useEffect, useRef } from 'react';
import { useState, useEffect } from 'react';
import { movies } from "../../data.js";

// Router
// import { Routes, Route, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
// Add the following import
import { getUser, checkToken } from '../../utilities/users-service';
// import { getGroups } from '../../utilities/groups-api';
import * as groupsAPI from '../../utilities/groups-api';

// Custom Components
import NavBar from '../../components/NavBar/NavBar'
import ActorListPage from '../ActorListPage/ActorListPage'
import ActorDetailPage from '../ActorDetailPage/ActorDetailPage'
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage'
import MoviesListPage from '../MoviesListPage/MoviesListPage'
import LogInPage from '../LogInPage/LogInPage'
import UserDetailPage from '../UserDetailPage/UserDetailPage'
import GroupsListPage from '../GroupsListPage/GroupsListPage'
import GroupDetailPage from '../GroupDetailPage/GroupDetailPage'
import NewGroupPage from '../NewGroupPage/NewGroupPage'

export default function App() {

	const [user, setUser] = useState(getUser());

	// const [groups, setGroups] = useState(getGroups());
	const [groups, setGroups] = useState([]);
	// const categoriesRef = useRef([]);
	// const navigate = useNavigate();

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

	const [authPage, setAuthPage] = useState()

	const castArrOfArr = movies.map(m => m.cast)
	const castArray2D = [].concat(...castArrOfArr)
	const castSet = new Set(castArray2D);
	const castArray = Array.from(castSet);

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
						<Route path="/movies" element={<MoviesListPage movies={movies} />} />
						<Route path="/movies/:title" element={<MovieDetailPage movies={movies} />} />
						<Route path="/actors" element={<ActorListPage castArray={castArray}/>} />
						<Route path="/actors/:actor" element={<ActorDetailPage castArray={castArray}/>} />
						<Route path="/user/:id" element={<UserDetailPage user={user} groups={groups}/>} />
						<Route path="/groups" element={<GroupsListPage groups={groups} setGroups={setGroups}/>} />
						<Route path="/groups/:id" element={<GroupDetailPage groups={groups} setGroups={setGroups}/>} />
						{/* <Route path="/groups/:id" element={<GroupDetailPage group={group}/>} /> */}
						<Route path="/groups/new" element={<NewGroupPage groups={groups} setGroups={setGroups} user={user}/>} />
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