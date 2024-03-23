// pages/api/proxy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
