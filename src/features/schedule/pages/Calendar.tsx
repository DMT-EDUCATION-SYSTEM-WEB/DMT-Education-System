import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const events = [
    // Sample events data
    {
      title: 'Math Class',
      start: new Date(2023, 9, 10, 10, 0), // October 10, 2023, 10:00 AM
      end: new Date(2023, 9, 10, 11, 0), // October 10, 2023, 11:00 AM
    },
    {
      title: 'Science Class',
      start: new Date(2023, 9, 11, 12, 0), // October 11, 2023, 12:00 PM
      end: new Date(2023, 9, 11, 13, 0), // October 11, 2023, 1:00 PM
    },
  ];

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-bold mb-4">Class Schedule</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
};

export default Calendar;