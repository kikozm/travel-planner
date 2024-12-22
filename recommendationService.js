const Attraction = require('../models/Attraction');
const externalApiService = require('./externalApiService');

/**
 * מייצר תכנון טיול ראשוני על בסיס:
 * - היעד (destination)
 * - מספר ימים (tripDuration)
 * - פרופיל המטיילים (travelersProfile)
 * - העדפות (preferences: Map של דירוגים 1-10)
 */
exports.generatePlan = async ({ destination, tripDuration, travelersProfile, preferences }) => {
  // 1. איתור אטרקציות רלוונטיות ביעד
  const rawAttractions = await Attraction.find({ /* סינון לפי destination */ });
  // 2. ניתן גם לקרוא API חיצוני למשל מגוגל או טריפאדווייזר
  const externalAttractions = await externalApiService.fetchAttractions(destination);

  // 3. איחוד / סינון נתונים (למשל לפי קטגוריות, זמני פתיחה וכו’)
  let mergedAttractions = [...rawAttractions, ...externalAttractions];

  // 4. הקצאת משקלים על פי ההעדפות
  //    לדוגמה: אם המשתמש דירג "Museums" בציון 9, ניתן עדיפות לאטרקציות מסוג מוזיאון
  mergedAttractions = mergedAttractions.filter((attr) => {
    // בדיקת התאמה לפרופיל, למשל אם יש ילדים קטנים, נדרוש attr.category != "Night Club"
    // כאן אפשר להכניס לוגיקה מורכבת יותר
    return true; 
  });

  // 5. חלוקה לימי טיול (פשטות: מחלקים לכמות ימים, 2-3 אטרקציות ביום)
  let plan = [];
  for (let day = 1; day <= tripDuration; day++) {
    plan.push({
      day,
      activities: []
    });
  }

  // 6. שיבוץ בפועל (בגרסה אמיתית, לוקחים בחשבון שעות פתיחה, מרחקים, זמן נסיעה וכו’)
  //    כאן נדגים בפשטות.
  let index = 0;
  for (let dayObj of plan) {
    // לדוגמה: בוחרים 2 אטרקציות מכלל הרשימה
    dayObj.activities = mergedAttractions.slice(index, index + 2).map((attraction) => ({
      attractionId: attraction._id,
      startTime: new Date(),
      endTime: new Date()
    }));
    index += 2;
  }

  return plan;
};
