function ScoreScreen({ score, name, restart }) {

    return (
      <>
        <h1>{name}, score is: {score}</h1>
        <button onClick={restart}>Restart</button>
      </>
    );
  }
  
  export default ScoreScreen;
  