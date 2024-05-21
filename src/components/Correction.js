import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../components/Correction.css';

function Correction({ uploadedDoc, jobDescription }) {
  const genAI = new GoogleGenerativeAI("AIzaSyD94CdKXLoxcR_u-hb7Y1TR9cHHQ2aMT1c");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobDescription && uploadedDoc) {
      generateCorrections();
    }
  }, [jobDescription, uploadedDoc]);

  async function generateCorrections() {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description and the CV to suggest 3 ways to make the CV more aligned with the job description`;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const corrections = await response.text();
      const cleanedCorrections = corrections
        .split('\n')
        .map(suggestion => suggestion.trim().replace(/^\*\s*/, ''))
        .filter(suggestion => suggestion.length > 0)
        .slice(0, 3); // Limit to 3 suggestions
      setSuggestions(cleanedCorrections.join('\n'));
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="correction">
      <h2 className="correction-head">CV Improvements</h2>
      <div className="correction-box">
        {loading ? (
          <p>Loading...</p>
        ) : (
          suggestions ? (
            <ul>
              {suggestions.split('\n').map((suggestion, index) => (
                <li key={index} className="correction-key">
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="correction-def">Upload job description and CV to generate improvement suggestions</p>
          )
        )}
      </div>
    </div>
  );
}

export default Correction;
