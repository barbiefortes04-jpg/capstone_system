import React from 'react';

export default function DefenseSchedulesDashboard() {
  // Sample defense events
  const defenseEvents = [
    {
      group: 'Group A',
      date: 'March 25, 2026',
      time: '10:00 AM',
      location: 'Room 101',
      status: 'Scheduled',
    },
    {
      group: 'Group B',
      date: 'March 27, 2026',
      time: '2:00 PM',
      location: 'Room 202',
      status: 'Pending',
    },
    {
      group: 'Group C',
      date: 'March 29, 2026',
      time: '9:00 AM',
      location: 'Room 303',
      status: 'Completed',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Defense Schedules</h1>
          <p className="text-lg text-slate-700 mt-2">View and manage upcoming defense hearings, demos, and final schedules.</p>
        </header>

        {/* Alerts */}
        <div className="mb-6">
          <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded mb-2">
            <strong>Reminder:</strong> Please confirm your attendance for upcoming defense events.
          </div>
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
            <strong>Note:</strong> Defense schedules are subject to change. Check regularly for updates.
          </div>
        </div>

        {/* Calendar Placeholder */}
        <div className="mb-8">
          <div className="bg-white border border-slate-200 rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">March 2026 Calendar</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(31)].map((_, i) => (
                <div key={i} className="py-2 border rounded text-slate-700 bg-slate-50">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Defense Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Defense Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defenseEvents.map((event, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded shadow p-5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-blue-900">{event.group}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${event.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : event.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{event.status}</span>
                </div>
                <div className="text-slate-700 mb-1">{event.date} • {event.time}</div>
                <div className="text-slate-500 mb-2">Location: {event.location}</div>
                <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Details</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
