import axios from "axios";
import React, { useEffect, useState } from "react";
import { End } from "./End.jsx";

export const Question = () => {
  const [questions, setQuestions] = useState([]);
  // const [single, setSingle] = useState({});
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [falsea, setFalsea] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState([])
  const [yourAnswer, setYourAnswer] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"
        );
        setQuestions(res.data.results);
      } catch (err) {
        console.log("error");
      }
    };
    fetchData();

  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  const handleSubmit = () => {
    if (answer?.toLowerCase() === questions[counter]?.correct_answer.toLowerCase()) {
      setCorrect(correct + 1);
      setCorrectAnswer([...correctAnswer, questions[counter]?.correct_answer])
      setYourAnswer([...yourAnswer, answer])
    } else {
      setFalsea(falsea + 1);
      setYourAnswer([...yourAnswer, answer])
      setCorrectAnswer([...correctAnswer, questions[counter]?.correct_answer]);
    }
    setCounter(counter + 1);
  };

  const enter = (e) => {
    if(e.key === 'Enter' ) {
      handleSubmit();
      e.target.value = ""
    }
    else {
      return
    }
  }
  return (
    <div className="question-cont">
      {counter < 10 ? <div className="content">
        <div className="scoreboard">
          <div className="correct">
            <p>Correct: {correct}</p>
          </div>
          <div className="incorrect">
            <p>Incorrect: {falsea}</p>
          </div>
        </div>
        <div className="question">
          <ul className="question-ul">
            {questions.map(question => {
              return (
                <li className="question-li">
                  <h3 className="question-content">
                    {counter + 1}: {getText(question?.question)}
                  </h3>
                </li>
              )
            })[counter]}
          </ul>
        </div>
        <div className="answer-cont">
          <input
            type="text"
            className="answer-input"
            placeholder="Type your answer"
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={enter}
          />
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div> : <End correct={correct} falsea={falsea} correctAnswer={correctAnswer} yourAnswer={yourAnswer}/>}
    </div>
  );
};

export default Question;
