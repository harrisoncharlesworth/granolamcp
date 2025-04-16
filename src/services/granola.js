/**
 * Granola service for interacting with the Granola API
 */

const axios = require('axios');

/**
 * Get transcript data from Granola API
 * 
 * @param {string} type - Type of data to retrieve (summary, action_items, decisions)
 * @param {string} date - Meeting date in YYYY-MM-DD format
 * @param {string} participant - (Optional) Participant name to filter by
 * @returns {Promise<Object>} Transcript data
 */
async function getTranscriptData(type, date, participant = null) {
  try {
    // Replace with actual Granola API endpoint
    const GRANOLA_API_URL = process.env.GRANOLA_API_URL || 'https://api.granola.example';
    const GRANOLA_API_KEY = process.env.GRANOLA_API_KEY;
    
    if (!GRANOLA_API_KEY) {
      throw new Error('Granola API key is missing');
    }
    
    // Validate type parameter
    const validTypes = ['summary', 'action_items', 'decisions'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type parameter: ${type}. Must be one of: ${validTypes.join(', ')}`);
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
    }
    
    const params = { type, date };
    if (participant) {
      params.participant = participant;
    }
    
    const response = await axios.get(`${GRANOLA_API_URL}/transcripts`, {
      params,
      headers: {
        'Authorization': `Bearer ${GRANOLA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in getTranscriptData:', error.message);
    throw error;
  }
}

module.exports = {
  getTranscriptData
};
