import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");

  async function loadEvents() {
    const res = await fetch(`${API}/events`);
    const data = await res.json();
    setEvents(data);
  }

  async function addEvent() {
    if (!title) return;
    await fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        event_time: new Date().toISOString()
      })
    });
    setTitle("");
    loadEvents();
  }

  useEffect(() => {
    if (API) loadEvents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Ticket Cloud</h1>
      <h2>Welcome</h2>
      <p><b>API:</b> {API}</p>

      <input
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addEvent}>Add</button>

      <ul>
        {events.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
