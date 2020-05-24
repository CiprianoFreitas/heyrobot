import Card from "../components/card";
import { useState, useEffect } from "react";
const words = require("../words.json");

export default () => {
  const [team1Points, setTeam1Points] = useState(0);
  const [team2Points, setTeam2Points] = useState(0);

  const currentGameWords = [];
  for (let i = 0; i < 16; i++) {
    const pickedIndex = Math.floor(Math.random() * words.length);
    currentGameWords.push(words[pickedIndex]);
    words.splice(pickedIndex, 1);
  }
  const [currentWords, setCurrentWords] = useState(currentGameWords);
  const [isTeam1, setIsTeam1] = useState(true);

  useEffect(() => {});
  return (
    <div>
      <div className="scoring">
        <div
          className={`score
          ${currentWords.length > 0 && isTeam1 ? "team-active" : ""}`}
        >
          <strong>
            Team 1<h2>{team1Points}</h2>
          </strong>
        </div>
        <div
          className={`score
          ${currentWords.length > 0 && !isTeam1 ? "team-active" : ""}`}
        >
          <strong>
            Team 2<h2>{team2Points}</h2>
          </strong>
        </div>
      </div>
      <h1 className="title">Hey Robot!</h1>
      <div className="final-score">
        {currentWords.length === 0 &&
          team1Points > team2Points &&
          "Team 1 Wins 🙌🏻"}
        {currentWords.length === 0 &&
          team2Points > team1Points &&
          "Team 2 Wins 🙌🏻"}
      </div>
      <ul>
        {currentWords.map((w, i) => {
          return (
            <Card
              key={w.word}
              word={w.word}
              points={w.points}
              onGotIt={(_, points) => {
                const things = currentWords;
                things.splice(i, 1);
                console.log("things", things);
                setCurrentWords(things);

                if (isTeam1) setTeam1Points(team1Points + points);
                else setTeam2Points(team2Points + points);
                setIsTeam1(!isTeam1);
              }}
              onDamnIt={() => setIsTeam1(!isTeam1)}
            />
          );
        })}
      </ul>
    </div>
  );
};
