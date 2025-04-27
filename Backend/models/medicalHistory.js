const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema(
  {
    // Link to the User model (assuming you have a User model)
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to your User model name
      required: true,
      unique: true, // Each user should have only one medical history document
      index: true, // Index for faster lookups by userId
    },
    // Known medical conditions (e.g., Diabetes, Hypertension, Asthma)
    conditions: [
      {
        type: String,
        trim: true, // Remove leading/trailing whitespace
      },
    ],
    // Known allergies (e.g., Penicillin, Sulfa Drugs, Nuts)
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
    // Current medications the user is taking (including dosage/frequency if needed)
    // For simplicity, starting with strings. Could be enhanced to objects:
    // { name: String, dosage: String, frequency: String }
    currentMedications: [
      {
        type: String, // Or define a sub-schema for more detail
        trim: true,
      },
    ],
    // Optional: Past significant surgeries or procedures
    pastSurgeries: [
      {
        name: { type: String, trim: true },
        year: { type: String, trim: true }, // Or Number, depending on desired input
      },
    ],
    // Optional: General notes or additional relevant medical information
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Optional: Add pre-save hooks if needed, e.g., for validation logic

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
