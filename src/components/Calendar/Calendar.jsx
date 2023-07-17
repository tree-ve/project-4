import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default async function Calendar() {
    return (
        <FullCalendar className="calendar"
            plugins={[ dayGridPlugin ]}
            firstDay={1}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2023-07-18' },
                { title: 'event 2', date: '2023-07-20' }
            ]}
        />
    )
}