const axios = require('axios');

exports.fetchAttractions = async (destination) => {
  try {
    // דוגמה: קריאה ל-Google Places או TripAdvisor
    // כאן נשתמש רק ב-Dummy
    // בפועל תצטרך להכניס מפתחות API, לבנות את ה-URL ולפרש את התגובה

    const dummyData = [
      { 
        _id: 'ext_1',
        name: 'Famous Museum', 
        category: 'Museum', 
        location: { type: 'Point', coordinates: [35.21, 31.77] },
        imageUrl: 'https://example.com/museum.jpg'
      },
      {
        _id: 'ext_2',
        name: 'Popular Park', 
        category: 'Park', 
        location: { type: 'Point', coordinates: [35.22, 31.78] },
        imageUrl: 'https://example.com/park.jpg'
      }
    ];
    return dummyData;
  } catch (error) {
    console.error('Failed to fetch external attractions', error);
    return [];
  }
};
