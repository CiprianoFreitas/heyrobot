import Card from "../components/card";
import Head from "next/head";
import { useState, useEffect } from "react";
const words = require("../words.json");

export default () => {
  const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
    const [value, setValue] = React.useState(() => {
      if (typeof window !== "undefined") {
        return (
          JSON.parse(localStorage.getItem(localStorageKey)) || defaultValue
        );
      } else {
        return defaultValue;
      }
    });

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }
    }, [value instanceof Array ? value.length : value]);

    return [value, setValue];
  };

  const [team1Points, setTeam1Points] = useStateWithLocalStorage(
    "team1Points",
    0
  );
  const [team2Points, setTeam2Points] = useStateWithLocalStorage(
    "team2Points",
    0
  );

  const currentGameWords = [];
  for (let i = 0; i < 16; i++) {
    const pickedIndex = Math.floor(Math.random() * words.length);
    currentGameWords.push(words[pickedIndex]);
    words.splice(pickedIndex, 1);
  }
  const [currentWords, setCurrentWords] = useStateWithLocalStorage(
    "currentWords",
    currentGameWords
  );
  const [isTeam1, setIsTeam1] = useStateWithLocalStorage("isTeam1", true);

  useEffect(() => {});
  return (
    <div>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
