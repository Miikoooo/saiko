import React, { useState } from "react";
import Generate from "./Generate";

function Form() {
  const [players, setPlayers] = useState([]);
  const [key, setKey] = useState(0);

  function addP(event) {
    event.preventDefault();
    const inputElement = document.getElementById("fillIn");
    const inputValue = inputElement.value;
    if (inputValue) {
      const playerData = inputValue.split(", ");
      const player = {
        name: playerData[0],
        elo: parseInt(playerData[1]), // Verwenden Sie die Eingabe der Spieler direkt als Elo
      };
      setPlayers((prevSpieler) => [...prevSpieler, player]);
      inputElement.value = "";
      setKey(key + 1);
    }
  }

  return (
    <div className="form">
      <label id="playerHeading">🔽 noob, elo 🔽</label>
      <form className="player" onSubmit={addP}>
        <div className="start">
          <input id="fillIn" type="text" name="player"></input>
        </div>
      </form>
      <ul className="allPlayers">
        {players.map((player, index) => (
          <li id="pl" key={index}>
            {player.name}, {player.elo}
          </li>
        ))}
      </ul>
      <div className="generate">
        <Generate players={players} key={key} />
      </div>
    </div>
  );
}

export default Form;
