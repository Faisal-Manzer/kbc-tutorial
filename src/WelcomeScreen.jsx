function WelcomeScreen({ move, name, setName, leaderBoard }) {
    const handleInputChange = (event) => {
        setName(event.target.value);
    };

  return (
    <>
      <h1>Welcome to the Game</h1>
    <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={move}>Start Game</button>

      <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            {Object.keys(leaderBoard).map((name) => (
                <tr>
                    <td>{name}</td>
                    <td>{leaderBoard[name]}</td>
                </tr>
            ))}
        </table>
      </div>
    </>
  );
}

export default WelcomeScreen;
