// Netlify Function to proxy Open-Meteo Weather API
// Handles both pressure and temperature data

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
  if (!params.latitude || !params.longitude) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'latitude and longitude parameters required' })
    };
  }

  try {
    // Build URL with all query parameters
    const queryString = new URLSearchParams(params).toString();
    const url = `https://api.open-meteo.com/v1/forecast?${queryString}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open-Meteo API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch weather data',
        message: error.message
      })
    };
  }
};
