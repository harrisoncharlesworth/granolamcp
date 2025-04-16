# Granola MCP Integration

This service provides integration with Granola meeting transcripts through a MCP (Message Communication Protocol) interface.

## Features

- Retrieve meeting summaries, action items, and decisions from Granola transcripts
- Filter transcript data by date and participant
- Simple REST API for accessing transcript data

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your Granola API credentials
3. Install dependencies:
   ```
   npm install
   ```
4. Start the service:
   ```
   npm start
   ```

## API Endpoints

### GET /api/transcript

Retrieves transcript data from Granola.

**Query Parameters:**

- `type` (required): Type of data to retrieve (`summary`, `action_items`, or `decisions`)
- `date` (required): Meeting date in YYYY-MM-DD format
- `participant` (optional): Person to filter the transcript by

**Example Request:**

```
GET /api/transcript?type=summary&date=2025-04-16&participant=John
```

## Development

Run the service in development mode with hot reloading:

```
npm run dev
```

Run tests:

```
npm test
```
