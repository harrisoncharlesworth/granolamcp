const express = require('express');
const { create } = require('@ampproject/toolbox-optimizer');
const { getTranscriptData } = require('./services/granola');

require('dotenv').config();

// Create AMP Optimizer instance
const ampOptimizer = create();
const app = express();
const PORT = process.env.AMP_PORT || 3001;

// AMP-specific middleware
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// AMP endpoint for transcripts
app.get('/amp/transcript', async (req, res) => {
  try {
    const { type, date, participant } = req.query;
    
    if (!type || !date) {
      return res.status(400).send(`<html><body>Error: Missing required parameters. Please provide type and date.</body></html>`);
    }
    
    const data = await getTranscriptData(type, date, participant);
    
    // Create AMP-compatible HTML response
    const html = `
      <!doctype html>
      <html ⚡>
        <head>
          <meta charset="utf-8">
          <title>Granola Transcript</title>
          <meta name="viewport" content="width=device-width">
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
          <style amp-custom>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .content { margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>Granola Transcript: ${type}</h1>
          <p>Date: ${date}</p>
          ${participant ? `<p>Participant: ${participant}</p>` : ''}
          <div class="content">
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
        </body>
      </html>
    `;
    
    // Optimize the AMP HTML
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  } catch (error) {
    console.error('AMP error:', error);
    res.status(500).send(`<html><body>Error: ${error.message}</body></html>`);
  }
});

// Health check endpoint
app.get('/amp/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'amp-mcp' });
});

app.listen(PORT, () => {
  console.log(`AMP MCP server running on port ${PORT}`);
});
