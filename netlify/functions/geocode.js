// Netlify Function to proxy Open-Meteo Geocoding API

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

  // Get query parameters from the request
  const params = event.queryStringParameters || {};

  // Validate required parameters
  if (!params.name) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'name parameter required' })
    };
  }

  try {
    // Build URL with all query parameters
    const queryString = new URLSearchParams(params).toString();
    const url = `https://geocoding-api.open-meteo.com/v1/search?${queryString}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geocoding API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch geocoding data',
        message: error.message
      })
    };
  }
};
