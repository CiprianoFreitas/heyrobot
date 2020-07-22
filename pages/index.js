import Card from "../components/card";
import CustomHead from "../components/CustomHead";
const allTheWordsAvailable = require("../words.json");

const generateWords = (words) => {
  const pickedWords = [];
  const wordsCloned = Object.assign([], words);
  for (let i = 0; i < 16; i++) {
    const pickedIndex = Math.floor(Math.random() * wordsCloned.length);
    pickedWords.push(wordsCloned[pickedIndex]);
    wordsCloned.splice(pickedIndex, 1);
  }

  return pickedWords;
};

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    if (typeof window !== "undefined") {
      const localStorageValue = JSON.parse(
        localStorage.getItem(localStorageKey)
      );
      return localStorageValue != null ? localStorageValue : defaultValue;
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
  }, [value instanceof Array ? value.length : value]);

  return [value, setValue];
};

const Index = ({ words = [] }) => {
  const [team1Points, setTeam1Points] = useStateWithLocalStorage(
    "team1Points",
    0
  );
  const [team2Points, setTeam2Points] = useStateWithLocalStorage(
    "team2Points",
    0
  );

  const [currentWords, setCurrentWords] = useStateWithLocalStorage(
    "currentWords",
    words
  );
  const [isTeam1, setIsTeam1] = useStateWithLocalStorage("isTeam1", true);

  const restart = () => {
    setTeam1Points(0);
    setTeam2Points(0);
    setCurrentWords(generateWords(allTheWordsAvailable));
    setIsTeam1(true);
  };

  return (
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
                const remainingWords = currentWords;
                remainingWords.splice(i, 1);
                setCurrentWords(remainingWords);

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

export async function getServerSideProps(context) {
  return {
    props: {
      words: generateWords(allTheWordsAvailable),
    },
  };
}

export default Index;
