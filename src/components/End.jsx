import React from "react";

export const End = (props) => {
  return (
    <div className="over">
      <div className="over-cont">
        <div>
          <p className="over-correct">Correct Answers: {props.correct}</p>
        </div>
        <div>
          <p className="over-incorrect">Incorrect Answers: {props.falsea}</p>
        </div>
        <div className="table-div">
          <table className="answers-table">
            <tr className="correct-incorrect">
              <th>Correct Answers</th>
            </tr>
            {props.correctAnswer.map((answer) => {
              return (
                <tr className="answers-table-content">
                  <td>{answer}</td>
                </tr>
              );
            })}
          </table>
          <table className="answers-table">
            <tr className="correct-incorrect">
              <th>Your Answers</th>
            </tr>
            {props.yourAnswer.map((answer) => {
              return (
                <tr className="answers-table-content">
                  <td>
                    {answer}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <button className="again-btn" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    </div>
  );
};

export default End;
