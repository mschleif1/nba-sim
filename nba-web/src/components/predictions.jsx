import React, { useState, useEffect } from "react";
import {
  initialize,
  separateByConf,
  quickSortRank,
} from "../algorithms/createData";
import {
  simulateSeries,
  createSeeds,
  simulateConfPlayoffs,
} from "../algorithms/simulate";

let teams = initialize();

const Predictions = () => {
  const [reset, setReset] = useState(false);

  useEffect(() => {
    resetTeams();
    const [east, west] = separateByConf(teams);
    const eastPlayoffTeams = createSeeds(east);
    const westPlayoffTeams = createSeeds(west);
    const westFinalist = simulateConfPlayoffs(westPlayoffTeams, 4);
    const eastFinalist = simulateConfPlayoffs(eastPlayoffTeams, 4);
    const winner = simulateSeries(eastFinalist, westFinalist);
    console.log(winner);
  }, [reset]);

  const resetTeams = () => {
    teams.forEach((team) => {
      team.simRating = team.rating;
      team.finalsWins = 0;
      teams.confFinalsWins = 0;
      team.confSemisWins = 0;
      team.confQuartersWins = 0;
    });
  };
  return <h1>What the heck</h1>;
};

export default Predictions;
