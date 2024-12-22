const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// יצירת מסלול חדש
router.post('/', itineraryController.createItinerary);
// בקשת מסלול קיים (למשל לפי מזהה)
router.get('/:itineraryId', itineraryController.getItineraryById);
// עדכון מסלול (הוספה/הסרה/שינוי סדר אטרקציות)
router.put('/:itineraryId', itineraryController.updateItinerary);
// הפקת מסמך/דוח טיול וכו’
router.get('/:itineraryId/export', itineraryController.exportItinerary);

module.exports = router;