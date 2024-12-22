const Itinerary = require('../models/Itinerary');
const recommendationService = require('../services/recommendationService');

exports.createItinerary = async (req, res) => {
  try {
    const {
      userId,
      destination,
      tripDuration,
      travelersProfile,
      preferences // יכול להגיע מהגוף / יכול להישלף ממשתמש
    } = req.body;

    // 1. חישוב המלצות ראשוניות
    const recommendedPlan = await recommendationService.generatePlan({
      destination,
      tripDuration,
      travelersProfile,
      preferences
    });

    // 2. שמירת המסלול בבסיס הנתונים
    const newItinerary = await Itinerary.create({
      userId,
      destination,
      tripDuration,
      travelersProfile,
      attractionsByDay: recommendedPlan,
    });

    return res.status(201).json({ itineraryId: newItinerary._id, plan: newItinerary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getItineraryById = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const itinerary = await Itinerary.findById(itineraryId).populate('attractionsByDay.activities.attractionId');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    return res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const { updatedAttractionsByDay } = req.body;
    // ניתן לממש בדיקות התנגשות, לוודא זמני נסיעה ועוד

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    // עדכון השדות הנדרשים
    itinerary.attractionsByDay = updatedAttractionsByDay;
    await itinerary.save();

    return res.status(200).json({ message: 'Itinerary updated', itinerary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.exportItinerary = async (req, res) => {
  try {
    // ניתן ליצור PDF או מסמך HTML המכיל פירוט מלא
    // בשביל פשטות, נחזיר JSON
    const { itineraryId } = req.params;
    const itinerary = await Itinerary.findById(itineraryId).populate('attractionsByDay.activities.attractionId');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    // כאן אפשר לשלב לוגיקה ליצירת PDF וכד’.
    return res.status(200).json({ itinerary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
