// pages/api/proxy.js

export default async (req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Set CORS headers to allow requests from all origins
    res.setHeader('Access-Control-Allow-Origin', 'https://oppstech.cloud');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, FETCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Send the data fetched from the external URL as the response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
