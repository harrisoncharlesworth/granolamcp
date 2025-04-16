/**
 * Granola MCP - Main entry point
 * 
 * This service enables integration with Granola transcripts via MCP
 */

require('dotenv').config();
const express = require('express');
const { getTranscriptData } = require('./services/granola');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Granola transcript endpoint
app.get('/api/transcript', async (req, res) => {
  try {
    const { type, date, participant } = req.query;
    
    if (!type || !date) {
      return res.status(400).json({ 
        error: 'Missing required parameters. Please provide type and date.' 
      });
    }
    
    const data = await getTranscriptData(type, date, participant);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching transcript data:', error);
    res.status(500).json({ error: 'Failed to fetch transcript data' });
  }
});

app.listen(PORT, () => {
  console.log(`Granola MCP service running on port ${PORT}`);
});
