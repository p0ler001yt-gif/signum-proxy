export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const path = req.query.path || '';
  if (!path.startsWith('/')) return res.status(400).json({ error: 'bad path' });

  const url = `https://api.polygon.io${path}`;

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.POLYGON_KEY}` }
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
