import { useRef, useState, useEffect } from "react";
import allQuestions from "./questions.json";
import WelcomeScreen from "./WelcomeScreen";
import ScoreScreen from "./ScoreScreen";

function getRandomElements(arr) {
  const result = [];
  const length = arr.length < 10 ? arr.length : 10;

  // Create a shallow copy of the array to avoid modifying the original
  const arrayCopy = arr.slice();

  for (let i = 0; i < length; i++) {
    // Generate a random index based on the remaining elements
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);

    // Push the element at the random index to the result array
    result.push(arrayCopy[randomIndex]);

    // Remove the element from the copy to avoid duplicates
    arrayCopy.splice(randomIndex, 1);
  }

  return result;
}

function App() {
  const [score, setScore] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState(
    JSON.parse(localStorage.getItem("scores") || "{}")
  );
  const [index, setIndex] = useState(-1);
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState(getRandomElements(allQuestions));

  const next = () => setIndex(index + 1);
  const restart = () => {
    setScore(0);
    setIndex(-1);
    setName("");
    setQuestions(getRandomElements(allQuestions));
  };

  useEffect(() => {}, [score]);

  if (index === -1)
    return (
      <WelcomeScreen
        leaderBoard={leaderBoard}
        move={next}
        name={name}
        setName={setName}
      />
    );
  if (index === 10)
    return <ScoreScreen score={score} name={name} restart={restart} />;

  const question = questions[index];

  const calculateScoreAndNext = (option) => {
    const newScore = option === question.answer ? score + 4 : score - 1;
    setScore(newScore);

    if (index === 9) {
      if (score > (leaderBoard[name] || 0)) {
        const newLeaderBoard = { ...leaderBoard, [name]: newScore };
        localStorage.setItem("scores", JSON.stringify(newLeaderBoard));

        setLeaderBoard(newLeaderBoard);
      }
    }

    next();
  };

  return (
    <>
      <h1>
        {index + 1}. {question.question}
      </h1>
      {question.options.map((option) => (
        <div
          key={option}
          onClick={() => calculateScoreAndNext(option)}
          style={{ cursor: "pointer", padding: 10 }}
        >
          {option}
        </div>
      ))}
    </>
  );
}

export default App;
