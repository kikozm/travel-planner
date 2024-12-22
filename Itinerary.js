const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: String, 
  tripDuration: Number, // מספר הימים (ניתן לשלב הגדרת חצאי ימים)
  travelersProfile: [String], // ["family", "friends", "business"...]
  attractionsByDay: [
    {
      day: Number,
      activities: [
        {
          attractionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attraction'
          },
          startTime: Date,
          endTime: Date
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
