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

const getState = (localStorageKey, defaultValue) => {
  const localStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
  return localStorageValue != null ? localStorageValue : defaultValue;
};

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [team1Points, setTeam1Points] = React.useState(0);

  const [team2Points, setTeam2Points] = React.useState(0);

  const [currentWords, setCurrentWords] = React.useState([]);

  const [isTeam1, setIsTeam1] = React.useState(true);

  React.useEffect(() => {
    setTeam1Points(getState("team1Points", 0));
    setTeam2Points(getState("team2Points", 0));
    setCurrentWords(
      getState("currentWords", generateWords(allTheWordsAvailable))
    );
    setIsTeam1(getState("isTeam1", true));
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("team1Points", JSON.stringify(team1Points));
  }, [team1Points]);
  React.useEffect(() => {
    localStorage.setItem("team2Points", JSON.stringify(team2Points));
  }, [team2Points]);
  React.useEffect(() => {
    localStorage.setItem("currentWords", JSON.stringify(currentWords));
  }, [currentWords, currentWords.length]);
  React.useEffect(() => {
    localStorage.setItem("isTeam1", JSON.stringify(isTeam1));
  }, [isTeam1]);

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
        {isLoading && <div className="spinner"></div>}
        {currentWords.length === 0 && !isLoading && (
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
  return { props: {} };
}

export default Index;
