import './App.css';
import { useState } from 'react';
import { movies } from "../../data.js";

// Router
import { Routes, Route } from 'react-router-dom'
// Add the following import
import { getUser, checkToken } from '../../utilities/users-service';

// Custom Components
import NavBar from '../../components/NavBar/NavBar'
import ActorListPage from '../ActorListPage/ActorListPage'
import ActorDetailPage from '../ActorDetailPage/ActorDetailPage'
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage'
import MoviesListPage from '../MoviesListPage/MoviesListPage'
import LogInPage from '../LogInPage/LogInPage'

export default function App() {

	const [user, setUser] = useState(getUser());

	const [authPage, setAuthPage] = useState()

	const castArrOfArr = movies.map(m => m.cast)
	const castArray2D = [].concat(...castArrOfArr)
	const castSet = new Set(castArray2D);
	const castArray = Array.from(castSet);
	// console.log(castArray)

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