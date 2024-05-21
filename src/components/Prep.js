import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../components/Prep.css';

function Prep({ uploadedDoc, jobDescription }) {
  const genAI = new GoogleGenerativeAI("AIzaSyD94CdKXLoxcR_u-hb7Y1TR9cHHQ2aMT1c");
  const [loading, setLoading] = useState(false);
  const [dsaQuest, setDsaQuest] = useState(null);
  const [techQuest, setTechQuest] = useState(null);
  const [behaviorQuest, setBehaviorQuest] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null);

  const generateQuestions = async (type) => {
    if (!jobDescription) {
      console.error("Job description is required");
      return;
    }

    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let prompt;

    switch (type) {
      case 'dsa':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate 5 possible interview questions on data structures and algorithms. Don't list the qualifications. Just the questions only.`;
        break;
      case 'behavioral':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate 5 possible behavioral interview questions. Don't list the qualifications. Just the questions only.`;
        break;
      case 'technical':
        prompt = `The job description is as follows: ${jobDescription}. The CV provided is ${uploadedDoc}. Please use the job description to generate 5 possible technical interview questions related to the specific technologies and skills mentioned. Don't list the qualifications. Just the questions only.`;
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

      switch (type) {
        case 'dsa':
          setDsaQuest(questions);
          setCurrentQuest(questions);
          break;
        case 'behavioral':
          setBehaviorQuest(questions);
          setCurrentQuest(questions);
          break;
        case 'technical':
          setTechQuest(questions);
          setCurrentQuest(questions);
          break;
        default:
          break;
      }

    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobDescription) {
      generateQuestions('dsa');
    }
  }, [jobDescription]);

  return (
    <div className="prep">
      <div className="prep-buttons">
        <button onClick={() => setCurrentQuest(dsaQuest)}>DSAs</button>
        <button onClick={() => {
          if (!techQuest) generateQuestions('technical');
          else setCurrentQuest(techQuest);
        }}>Technical</button>
        <button onClick={() => {
          if (!behaviorQuest) generateQuestions('behavioral');
          else setCurrentQuest(behaviorQuest);
        }}>Behavioral</button>
      </div>

      <div className="prep-box">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentQuest ? (
            <ul>
              {currentQuest.split("\n").map((question, index) => (
                <li key={index} className="prep-key">
                  {question.replace(/^\*\s*/, "")}
                </li>
              ))}
            </ul>
          ) : null
        )}
        <div className="prep-below">
        <p>Practice questions will appear here</p>
        </div>
       
      </div>

      <div className="prep-footer">
        <p>Powered by Gemini</p>
      </div>
    </div>
  );
}

export default Prep;
