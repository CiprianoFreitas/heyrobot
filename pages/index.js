import Card from '../components/card';
import CustomHead from '../components/CustomHead';
import { useState, useEffect } from 'react';
const allTheWordsAvailable = require('../words.json');

const generateWords = words => {
  const pickedWords = [];
  const wordsCloned = Object.assign([], words);
  for (let i = 0; i < 16; i++) {
    const pickedIndex = Math.floor(Math.random() * wordsCloned.length);
    pickedWords.push(wordsCloned[pickedIndex]);
    wordsCloned.splice(pickedIndex, 1);
  }

  return pickedWords;
};

const getState = (localStorageKey, defaultValue) => {
  const localStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
  return localStorageValue != null ? localStorageValue : defaultValue;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [team1Points, setTeam1Points] = useState(0);

  const [team2Points, setTeam2Points] = useState(0);
  const [team3Points, setTeam3Points] = useState(0);

  const [currentWords, setCurrentWords] = useState([]);

  const [isTeam, setIsTeam] = useState(1);

  useEffect(() => {
    setTeam1Points(getState('team1Points', 0));
    setTeam2Points(getState('team2Points', 0));
    setTeam3Points(getState('team3Points', 0));
    setCurrentWords(
      getState('currentWords', generateWords(allTheWordsAvailable))
    );
    setIsTeam(getState('isTeam', 1));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('team1Points', JSON.stringify(team1Points));
  }, [team1Points]);
  useEffect(() => {
    localStorage.setItem('team2Points', JSON.stringify(team2Points));
  }, [team2Points]);
  useEffect(() => {
    localStorage.setItem('team3Points', JSON.stringify(team3Points));
  }, [team3Points]);
  useEffect(() => {
    localStorage.setItem('currentWords', JSON.stringify(currentWords));
  }, [currentWords, currentWords.length]);
  useEffect(() => {
    localStorage.setItem('isTeam', JSON.stringify(isTeam));
  }, [isTeam]);

  const restart = () => {
    setTeam1Points(0);
    setTeam2Points(0);
    setTeam3Points(0);
    setCurrentWords(generateWords(allTheWordsAvailable));
    setIsTeam(1);
  };

  return (
    <div>
      {isLoading && <div className="spinner"></div>}
      {!isLoading && (
        <div>
          <CustomHead />
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
          ${currentWords.length > 0 && isTeam === 1 ? 'team-active' : ''}`}
              >
                <strong>
                  Team 1<h2>{team1Points}</h2>
                </strong>
              </div>
              <div
                className={`score
          ${currentWords.length > 0 && isTeam === 2 ? 'team-active' : ''}`}
              >
                <strong>
                  Team 2<h2>{team2Points}</h2>
                </strong>
              </div>
              <div
                className={`score
          ${currentWords.length > 0 && isTeam === 3 ? 'team-active' : ''}`}
              >
                <strong>
                  Team 3<h2>{team3Points}</h2>
                </strong>
              </div>
            </div>
          </div>

          <h1 className="title">Hey Robot!</h1>
          <div className="final-score">
            {currentWords.length === 0 &&
              team1Points > team2Points &&
              'Team 1 Wins 🙌🏻'}
            {currentWords.length === 0 &&
              team2Points > team1Points &&
              'Team 2 Wins 🙌🏻'}
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
                    const remainingWords = currentWords;
                    remainingWords.splice(i, 1);
                    setCurrentWords(remainingWords);

                    if (isTeam === 1) setTeam1Points(team1Points + points);
                    if (isTeam === 2) setTeam2Points(team2Points + points);
                    if (isTeam === 3) setTeam3Points(team3Points + points);
                    let isNewTeam = isTeam + 1;
                    if (isNewTeam === 4) isNewTeam = 1;
                    setIsTeam(isNewTeam);
                  }}
                  onDamnIt={() => {
                    let isNewTeam = isTeam + 1;
                    if (isNewTeam === 4) isNewTeam = 1;
                    setIsTeam(isNewTeam);
                  }}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  return { props: {} };
}

export default Index;
