import Card from "../components/card";
import Head from "next/head";
import { useState, useEffect } from "react";
const words = require("../words.json");

export default () => {
  const generateWords = () => {
    const currentGameWords = [];
    const wordsCloned = Object.assign([], words);
    for (let i = 0; i < 16; i++) {
      const pickedIndex = Math.floor(Math.random() * wordsCloned.length);
      currentGameWords.push(wordsCloned[pickedIndex]);
      wordsCloned.splice(pickedIndex, 1);
    }

    return currentGameWords;
  };

  const [team1Points, setTeam1Points] = useState(0);
  const [team2Points, setTeam2Points] = useState(0);

  const [currentWords, setCurrentWords] = useState(generateWords());
  const [isTeam1, setIsTeam1] = useState(true);

  const restart = () => {
    setTeam1Points(0);
    setTeam2Points(0);
    setCurrentWords(generateWords());
    setIsTeam1(true);
  };

  useEffect(() => {});

  return (
    <div>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Hey Robot is an application to play with your digital assistant"
        />
        <title>Hey Robot</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a65c83" />
        <meta name="msapplication-TileColor" content="#feff5f" />
        <meta name="theme-color" content="#feff5f" />
      </Head>
      <div className="hoverBoard">
        {currentWords.length > 0 && (
          <button
            className="restart"
            onClick={() => {
              restart();
            }}
          >
            Restart
          </button>
        )}
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
      </div>
      <h1 className="title">Hey Robot!</h1>
      <div className="final-score">
        {currentWords.length === 0 &&
          team1Points > team2Points &&
          "Team 1 Wins 🙌🏻"}
        {currentWords.length === 0 &&
          team2Points > team1Points &&
          "Team 2 Wins 🙌🏻"}
        {currentWords.length === 0 && (
          <div>
            <button
              className="restart"
              onClick={() => {
                restart();
              }}
            >
              Restart
            </button>
          </div>
        )}
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
