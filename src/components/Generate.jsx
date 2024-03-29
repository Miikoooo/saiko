import React, { useState } from "react";

function Generate({ players }) {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [showTeams, setShowTeams] = useState(false);

  function teams() {
    setTeam1([]);
    setTeam2([]);

    let spieler = [...players];
    spieler.sort((a, b) => b.elo - a.elo);

    let bestDifference = Infinity;
    let bestTeams = null;

    for (let i = 0; i < 1 << spieler.length; i++) {
      let team1 = [];
      let team2 = [];

      for (let j = 0; j < spieler.length; j++) {
        if ((i & (1 << j)) !== 0) {
          team1.push(spieler[j]);
        } else {
          team2.push(spieler[j]);
        }
      }

      if (team1.length !== team2.length) continue;

      let eloSum1 = team1.reduce((sum, player) => sum + player.elo, 0);
      let eloSum2 = team2.reduce((sum, player) => sum + player.elo, 0);

      let difference = Math.abs(eloSum1 - eloSum2);
      if (difference < bestDifference) {
        bestDifference = difference;
        bestTeams = [team1, team2];
      }
    }

    if (bestTeams) {
      setTeam1(bestTeams[0]);
      setTeam2(bestTeams[1]);
    }
    setShowTeams(true);
  }

  function shuffleTeams() {
    if (team1.length === 0 || team2.length === 0) {
        alert("Fucking loser generates teams u stupid?");
        return;
    }

    let newTeam1 = [...team1];
    let newTeam2 = [...team2];

    let originalEloSum1 = newTeam1.reduce((sum, player) => sum + player.elo, 0);
    let originalEloSum2 = newTeam2.reduce((sum, player) => sum + player.elo, 0);

    let randomPlayer1 = newTeam1[Math.floor(Math.random() * newTeam1.length)];
    let randomPlayer2 = newTeam2[Math.floor(Math.random() * newTeam2.length)];

    let newEloSum1 = originalEloSum1 - randomPlayer1.elo + randomPlayer2.elo;
    let newEloSum2 = originalEloSum2 - randomPlayer2.elo + randomPlayer1.elo;

    let eloDifference1 = Math.abs(newEloSum1 - originalEloSum1);
    let eloDifference2 = Math.abs(newEloSum2 - originalEloSum2);
    if (eloDifference1 <= 10 && eloDifference2 <= 10) {
      newTeam1[newTeam1.indexOf(randomPlayer1)] = randomPlayer2;
      newTeam2[newTeam2.indexOf(randomPlayer2)] = randomPlayer1;
    }

    let sameTeams =
      newTeam1.every((player, index) => player === team1[index]) &&
      newTeam2.every((player, index) => player === team2[index]);

    if (sameTeams) {
      shuffleTeams();
    } else {
      setTeam1(newTeam1);
      setTeam2(newTeam2);
      setShowTeams(true);
    }
    
  }

  return (
    <div>
      <button onClick={teams} className="button-18">
        Generate
      </button>
      <button onClick={shuffleTeams} className="button-18">
        Shuffle
      </button>
      {showTeams && (
        <div className="teamsgen">
          <div className="first">
            <h2>Team 1</h2>
            <div className="fP">
              {team1.reduce((sum, player) => sum + player.elo, 0)}
              {team1.map((player, index) => (
                <p key={index}>{player.name}</p>
              ))}
            </div>
          </div>
          <div className="second">
            <h2>Team 2</h2>
            <div className="sP">
              {team2.reduce((sum, player) => sum + player.elo, 0)}
              {team2.map((player, index) => (
                <p key={index}>{player.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
