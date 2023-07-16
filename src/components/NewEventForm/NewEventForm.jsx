import { useState } from 'react';
// import { Component } from 'react';
// import { newEvent } from '../../utilities/events-service';
import * as eventsAPI from '../../utilities/events-api';
import { useNavigate } from 'react-router-dom';

export default function NewEventForm({ events, setEvents, user }) {
    const [eventFormData, setEventFormData] = useState({
        name: '',
        start: '',
        end: '',
        user: user._id,
        error: ''
    });

    const navigate = useNavigate()

    const [error, setError] = useState('');

    function handleChange(evt) {
        setEventFormData({ ...eventFormData, [evt.target.name]: evt.target.value });
        // console.log(credentials)
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            console.log(eventFormData)
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const event = await eventsAPI.newEvent(eventFormData);
            const newEvents = [...events, event];
            setEvents(newEvents);
            navigate(`../../user/${user._id}`)
        } catch {
            setError('Event Creation Failed - Try Again');
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>name</label>
                        <input type="text" name="name" value={eventFormData.name} onChange={handleChange} required />
                        <label>Start</label>
                        <input type="date" name="start" value={eventFormData.start} onChange={handleChange} required />
                        <label>End</label>
                        <input type="date" name="end" value={eventFormData.end} onChange={handleChange} required />
                    </div>
                    <button type="submit">MAKE EVENT</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}