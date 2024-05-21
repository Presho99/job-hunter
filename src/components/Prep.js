import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../components/Prep.css';

function Prep({ uploadedDoc, jobDescription }) {
  const genAI = new GoogleGenerativeAI("AIzaSyD94CdKXLoxcR_u-hb7Y1TR9cHHQ2aMT1c");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async (type) => {
    if (!jobDescription) {
      console.error("Job description is required");
      return;
    }

    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let prompt;

    switch(type) {
      case 'dsa':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate possible data structure and algorithm questions. Don't list the qualifications. Just the questions.`;
        break;
      case 'behavioral':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate possible behavioral interview questions. Don't list the qualifications. Just the questions.`;
        break;
      case 'technical':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate possible technical interview questions related to the specific technologies and skills mentioned. Don't list the qualifications. Just the questions.`;
        break;
      default:
        console.error("Invalid question type");
        setLoading(false);
        return;
    }

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const questions = await response.text();
      setSuggestions(questions);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prep">

      <div className="prep-buttons">
            <button onClick={() => generateQuestions('dsa')}>DSAs</button>
            <button onClick={() => generateQuestions('technical')}>Technical</button>
            <button onClick={() => generateQuestions('behavioral')}>Behavioral</button>
          </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="prep-box">
             
          {suggestions ? (
            <ul>
              {suggestions.split("\n").map((suggestion, index) => (
                <li key={index} className="prep-key">
                  {suggestion.replace(/^\*\s*/, "")}
                </li>
              ))}
            </ul>
          ) : null}
         
        </div>
      )}
    </div>
  );
}

export default Prep;
