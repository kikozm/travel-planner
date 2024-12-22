const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: String,
  category: String, // למשל "Museum", "Park", "Restaurant"
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  openingHours: [String], // או מבנה רחב יותר
  rating: Number, // אפשר לשלוף TripAdvisor / Google
  imageUrl: String, // אפשר לשמור קישור לתמונה
  // ניתן להוסיף שדות רלוונטיים נוספים:
  // priceRange, websiteUrl, etc.
});

attractionSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Attraction', attractionSchema);
