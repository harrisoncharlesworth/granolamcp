/**
 * Tests for Granola service
 */

const { getTranscriptData } = require('../services/granola');

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('Granola Service', () => {
  beforeEach(() => {
    process.env.GRANOLA_API_KEY = 'test-api-key';
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  test('getTranscriptData should fetch data successfully', async () => {
    // Mock data
    const mockResponse = {
      data: {
        type: 'summary',
        date: '2025-04-16',
        content: 'This is a meeting summary'
      }
    };
    
    axios.get.mockResolvedValue(mockResponse);
    
    const result = await getTranscriptData('summary', '2025-04-16');
    
    expect(axios.get).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });
  
  test('getTranscriptData should throw error with invalid type', async () => {
    await expect(getTranscriptData('invalid-type', '2025-04-16'))
      .rejects
      .toThrow('Invalid type parameter');
  });
  
  test('getTranscriptData should throw error with invalid date format', async () => {
    await expect(getTranscriptData('summary', 'invalid-date'))
      .rejects
      .toThrow('Invalid date format');
  });
});
