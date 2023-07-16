import NewEventForm from '../../components/NewEventForm/NewEventForm';
// import LogInForm from '../../components/LogInForm/LogInForm';
// import './LogInPage.css';
// import { Link } from "react-router-dom"

export default function NewEventPage({ events, setEvents, user }) {
    return (
        <main>
            <h1>New Event</h1>
            <NewEventForm events={events} setEvents={setEvents} user={user}/>
        </main>
    );
}