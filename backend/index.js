const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory cache: { key: { [studentId]: status } }
// key = `${date}:${classId}:${section}`
const attendanceCache = Object.create(null);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/attendance', (req, res) => {
  const { date, classId, section } = req.query;
  if (!date || !classId || !section) {
    return res.status(400).json({ error: 'date, classId, section required' });
  }
  const key = `${date}:${classId}:${String(section).toUpperCase()}`;
  res.json({ key, statuses: attendanceCache[key] || {} });
});

app.post('/attendance', (req, res) => {
  const { date, classId, section, statuses } = req.body || {};
  if (!date || !classId || !section || !statuses || typeof statuses !== 'object') {
    return res.status(400).json({ error: 'date, classId, section, statuses required' });
  }
  const key = `${date}:${classId}:${String(section).toUpperCase()}`;
  attendanceCache[key] = { ...(attendanceCache[key] || {}), ...statuses };
  res.json({ ok: true, key });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});


