const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

app.get("/health", (req, res) => res.json({ ok: true }));

let events = [];
let id = 1;

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  const { title, event_time } = req.body;
  const newEvent = { id: id++, title, event_time };
  events.unshift(newEvent);
  res.json(newEvent);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
