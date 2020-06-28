import React from "react";
import { useState } from "react";
import games from "./games";
import * as JSOG from "jsog";
import Standings from "./standings";
import Team from "./team";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/green";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const Simulator = () => {
  const GAMES = JSOG.decode(games);
  let teams = [];

  //Filter through teams by each game. Check to see if the visitor is contained
  //by one of the team objects

  const containsTeam = (name) => {
    for (let i = 0; i < teams.length; i++) {
      if (name === teams[i].teamName) {
        return true;
      }
    }
    return false;
  };

  const findTeam = (name) => {
    for (let i = 0; i < teams.length; i++) {
      if (name.toLowerCase() === teams[i].teamName) {
        return teams[i];
      }
    }
    return -1;
  };

  //Creates list of team objs
  GAMES.data.map((game) => {
    if (!containsTeam(game.Visitor.toLowerCase())) {
      teams.push(new Team(game.Visitor.toLowerCase()));
    }
  });

  console.log(GAMES);

  const calculateElo = (winTeam, loseTeam) => {
    const probWinTeam =
      1.0 / (1.0 + 10.0 ** ((loseTeam.rating - winTeam.rating) / 400.0));
    const probLoseTeam = 1.0 - probWinTeam;
    winTeam.rating = winTeam.rating + 32.0 * (1.0 - probWinTeam);
    loseTeam.rating = loseTeam.rating + 32.0 * (0.0 - probLoseTeam);
  };

  //first team is the winning team
  const updateStats = (winTeam, loseTeam) => {
    winTeam.wins++;
    loseTeam.losses++;
    winTeam.calcWinPct();
    loseTeam.calcWinPct();
    calculateElo(winTeam, loseTeam);
  };

  const playGame = (game) => {
    let homeTeam = findTeam(game.Home);
    let awayTeam = findTeam(game.Visitor);
    if (game.VPTS > game.HPTS) {
      updateStats(awayTeam, homeTeam);
    } else {
      updateStats(homeTeam, awayTeam);
    }
  };

  GAMES.data.map((game) => {
    playGame(game);
  });

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#ff1744",
      },
    },
    typography: {
      fontFamily: ['"Helvetica Neue"'].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button>East</Button>
        <Button>West</Button>
        <Button>NBA</Button>
      </ButtonGroup>
      <Standings teams={teams} />;
    </ThemeProvider>
  );
};
export default Simulator;
