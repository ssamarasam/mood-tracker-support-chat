import React, { useRef, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const moodTrackingSchema = z.object({
  moodType: z.string(),
  moodSeverity: z.number().int(),
  sleepQuality: z.number().int(),
  stressLevel: z.number().int(),
  energyLevel: z.number().int(),
  physicalHealthIssue: z.string().optional(),
  emotionalStateIssue: z.string().optional(),
  triggeringEvents: z.string().optional(),
});

const MoodTrackingForm = () => {
  const moodTypeRef = useRef(null);
  const moodSeverityRef = useRef(null);
  const sleepQualityRef = useRef(null);
  const stressLevelRef = useRef(null);
  const energyLevelRef = useRef(null);
  const physicalHealthIssueRef = useRef(null);
  const emotionalStateIssueRef = useRef(null);
  const triggeringEventsRef = useRef(null);
  const [moodType, setMoodType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    moodType: "",
    moodSeverity: "",

    sleepQuality: "",
    stressLevel: "",
    energyLevel: "",
    physicalHealthIssue: "",
    emotionalStateIssue: "",
    triggeringEvents: "",
  });

  const navigate = useNavigate();

  const clearErrorMessage = (e) => {
    const { name, value } = e.target;

    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleMoodTypeChange = (e) => {
    setMoodType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moodTrackingData = {
      moodType: "",
      moodSeverity: 0,
      sleepQuality: 0,
      stressLevel: 0,
      energyLevel: 0,
      physicalHealthIssue: "",
      emotionalStateIssue: "",
      triggeringEvents: "",
    };
    moodTrackingData.moodType = moodTypeRef.current.value;
    moodTrackingData.moodSeverity = parseInt(moodSeverityRef.current.value, 10);
    moodTrackingData.sleepQuality = parseInt(sleepQualityRef.current.value, 10);
    moodTrackingData.stressLevel = parseInt(stressLevelRef.current.value, 10);
    moodTrackingData.energyLevel = parseInt(energyLevelRef.current.value, 10);
    moodTrackingData.physicalHealthIssue = physicalHealthIssueRef.current.value;
    moodTrackingData.emotionalStateIssue = emotionalStateIssueRef.current.value;
    moodTrackingData.triggeringEvents = triggeringEventsRef.current.value;

    try {
      const validateFormData = moodTrackingSchema.parse(moodTrackingData);
      const URL = "http://localhost:3000" + "/user-mood/add-mood-tracking-data";
      const response = await axios.post(URL, moodTrackingData);
      if (response.status === 201) {
        console.log("Mood tracking data submitted successfully");
        // You can add a redirect or any other action here
      } else {
        setErrorMessage("Server Error");
      }
    } catch (err) {
      if (err.errors) {
        const listOfErrors = {};
        for (let formFieldErr of err.errors) {
          if (formFieldErr.path) {
            listOfErrors[formFieldErr.path[0]] = formFieldErr.message;
          }
        }
        setFormErrors({ ...listOfErrors });
        setErrorMessage("Check all the fields and enter valid input");
      }
    }
  };

  return (
    <div>
      <h2>Mood Tracking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moodType">Mood Type</label>
          <select
            ref={moodTypeRef}
            id="moodType"
            name="moodType"
            value={moodType}
            onChange={handleMoodTypeChange}
            required
          >
            <option value="">Select Mood Type</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Calm">Calm</option>
            <option value="Irritated">Irritated</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Energized">Energized</option>
            <option value="Tired">Tired</option>
            <option value="Stressed">Stressed</option>
            <option value="Content">Content</option>
            <option value="Excited">Excited</option>
            <option value="Confident">Confident</option>
            <option value="Lonely">Lonely</option>
            <option value="Grateful">Grateful</option>
            <option value="Motivated">Motivated</option>
            <option value="Overwhelmed">Overwhelmed</option>
            <option value="Hopeful">Hopeful</option>
            <option value="Frustrated">Frustrated</option>
            <option value="Peaceful">Peaceful</option>
            <option value="Bored">Bored</option>
          </select>
          {formErrors?.moodType && (
            <p className="error-message">{formErrors.moodType}</p>
          )}
        </div>
        <div>
          <label htmlFor="moodSeverity">Mood Severity</label>
          <input
            ref={moodSeverityRef}
            type="number"
            id="moodSeverity"
            name="moodSeverity"
            placeholder="Enter mood severity"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.moodSeverity && (
            <p className="error-message">{formErrors.moodSeverity}</p>
          )}
        </div>

        <div>
          <label htmlFor="sleepQuality">Sleep Quality</label>
          <input
            ref={sleepQualityRef}
            type="number"
            id="sleepQuality"
            name="sleepQuality"
            placeholder="Enter sleep quality"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.sleepQuality && (
            <p className="error-message">{formErrors.sleepQuality}</p>
          )}
        </div>
        <div>
          <label htmlFor="stressLevel">Stress Level</label>
          <input
            ref={stressLevelRef}
            type="number"
            id="stressLevel"
            name="stressLevel"
            placeholder="Enter stress level"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.stressLevel && (
            <p className="error-message">{formErrors.stressLevel}</p>
          )}
        </div>
        <div>
          <label htmlFor="energyLevel">Energy Level</label>
          <input
            ref={energyLevelRef}
            type="number"
            id="energyLevel"
            name="energyLevel"
            placeholder="Enter energy level"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.energyLevel && (
            <p className="error-message">{formErrors.energyLevel}</p>
          )}
        </div>
        <div>
          <label htmlFor="physicalHealthIssue">Physical Health Issue</label>
          <input
            ref={physicalHealthIssueRef}
            type="text"
            id="physicalHealthIssue"
            name="physicalHealthIssue"
            placeholder="Enter physical health issue"
            onChange={clearErrorMessage}
          />
          {formErrors?.physicalHealthIssue && (
            <p className="error-message">{formErrors.physicalHealthIssue}</p>
          )}
        </div>
        <div>
          <label htmlFor="emotionalStateIssue">Emotional State Issue</label>
          <input
            ref={emotionalStateIssueRef}
            type="text"
            id="emotionalStateIssue"
            name="emotionalStateIssue"
            placeholder="Enter emotional state issue"
            onChange={clearErrorMessage}
          />
          {formErrors?.emotionalStateIssue && (
            <p className="error-message">{formErrors.emotionalStateIssue}</p>
          )}
        </div>
        <div>
          <label htmlFor="triggeringEvents">Triggering Events</label>
          <input
            ref={triggeringEventsRef}
            type="text"
            id="triggeringEvents"
            name="triggeringEvents"
            placeholder="Enter triggering events"
            onChange={clearErrorMessage}
          />
          {formErrors?.triggeringEvents && (
            <p className="error-message">{formErrors.triggeringEvents}</p>
          )}
        </div>
        <div className="">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MoodTrackingForm;
