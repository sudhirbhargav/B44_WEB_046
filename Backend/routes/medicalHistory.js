const express = require("express");
const MedicalHistory = require("../models/medicalHistory.js"); // Adjust path as needed
const authMiddleware = require("../middleware/authMiddleware.js"); // Placeholder for your authentication middleware

const router = express.Router();

// --- Middleware ---
// Apply authentication middleware to all routes in this file
router.use(authMiddleware); // Ensures user is logged in for all medical history actions

// --- Routes ---

/**
 * @route   GET /api/medical-history
 * @desc    Get the logged-in user's medical history
 * @access  Private (Requires authentication)
 */
router.get("/", async (req, res) => {
  try {
    // req.user.id should be populated by your authMiddleware
    const userId = req.user.id;

    let history = await MedicalHistory.findOne({ userId });

    if (!history) {
      // If no history exists yet, return a default empty structure or create one
      // Option 1: Return empty structure
      return res.json({
        userId: userId,
        conditions: [],
        allergies: [],
        currentMedications: [],
        pastSurgeries: [],
        notes: "",
        // You might not have createdAt/updatedAt yet, handle appropriately
      });
      // Option 2: Create a basic one (less common for a GET request)
      // history = new MedicalHistory({ userId });
      // await history.save();
    }

    res.json(history);
  } catch (err) {
    console.error("Error fetching medical history:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @route   PUT /api/medical-history
 * @desc    Create or update the logged-in user's medical history
 * @access  Private (Requires authentication)
 */
router.put("/", async (req, res) => {
  const { conditions, allergies, currentMedications, pastSurgeries, notes } =
    req.body;
  const userId = req.user.id; // From auth middleware

  // Build the fields to update
  const historyFields = {};
  if (conditions !== undefined) historyFields.conditions = conditions;
  if (allergies !== undefined) historyFields.allergies = allergies;
  if (currentMedications !== undefined)
    historyFields.currentMedications = currentMedications;
  if (pastSurgeries !== undefined) historyFields.pastSurgeries = pastSurgeries;
  if (notes !== undefined) historyFields.notes = notes;

  try {
    // Use findOneAndUpdate with upsert: true
    // This will find the document by userId and update it if it exists,
    // or create a new one (upsert) if it doesn't.
    const updatedHistory = await MedicalHistory.findOneAndUpdate(
      { userId: userId }, // Find criteria
      { $set: historyFields }, // Fields to update/set
      {
        new: true, // Return the modified document rather than the original
        upsert: true, // Create a new document if one doesn't exist
        runValidators: true, // Ensure schema validations are run on update
        setDefaultsOnInsert: true, // Apply default values if creating anew
      }
    );

    res.json(updatedHistory);
  } catch (err) {
    console.error("Error updating medical history:", err.message);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: err.errors });
    }
    res.status(500).json({ message: "Server Error" });
  }
});

// Note: A DELETE route for the entire history might not be desirable.
// Users usually update fields rather than deleting the whole record.
// If needed, it could be added, ensuring it's tied to user account deletion policies.

module.exports = router;
