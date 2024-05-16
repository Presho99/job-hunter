import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Correction({ uploadedDoc, jobDescription }) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyD94CdKXLoxcR_u-hb7Y1TR9cHHQ2aMT1c"
  );
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateCorrections() {
    if (!jobDescription || !uploadedDoc) {
      console.error("Job description and CV text are required");
      return;
    }

    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please suggest improvements to the CV to better match the job description.`;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const corrections = await response.text();
      setSuggestions(corrections);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>CV Improvement Suggestions</h2>
      {loading ? (
        <p>Loading...</p>
      ): (
        <div>
          {suggestions ? (
            <div>
              <p>{suggestions}</p>
            </div>
          ): (
            <button onClick={generateCorrections}>Generate suggestions</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Correction;
