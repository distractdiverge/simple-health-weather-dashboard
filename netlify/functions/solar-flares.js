// Netlify Function to proxy NASA DONKI Solar Flare API
// This keeps the API key secure on the server side

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Get API key from environment variable
  const NASA_API_KEY = process.env.NASA_API_KEY;

  if (!NASA_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'NASA API key not configured' })
    };
  }

  // Get query parameters from the request
  const { startDate, endDate } = event.queryStringParameters || {};

  if (!startDate || !endDate) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'startDate and endDate parameters required' })
    };
  }

  try {
    // Call NASA DONKI API
    const url = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching solar flares:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch solar flare data',
        message: error.message
      })
    };
  }
};
