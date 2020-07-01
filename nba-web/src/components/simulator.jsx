import React, { useState, useEffect } from "react";
import games from "./games";
import * as JSOG from "jsog";
import Standings from "./standings";
import Team from "./team";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export const GAMES = JSOG.decode(games);

const Simulator = () => {
  const [currentTeams, setCurrentTeams] = useState([]);
  const [permanentTeams, setPermanentTeams] = useState([]);
  let teams = [];

  useEffect(() => {
    initialize();
    console.log("i am in the useEffect to change currentTeams");
    setCurrentTeams([...teams]);
    console.log(currentTeams);
    setPermanentTeams(teams);
  }, []);
  console.log(permanentTeams);

  useEffect(() => {
    console.log("currentTeams changed!");
  }, [currentTeams]);

  // Filter through teams by each game. Check to see if the visitor is contained
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

  const initialize = () => {
    for (let i = 0; i < GAMES.data.length; i++) {
      if (!containsTeam(GAMES.data[i].Visitor.toLowerCase())) {
        const conf = GAMES.data[i].Vconf === "w" ? "w" : "e";
        teams.push(new Team(GAMES.data[i].Visitor.toLowerCase(), conf));
      }
    }
    for (let i = 0; i < GAMES.data.length; i++) {
      playGame(GAMES.data[i]);
    }
  };
  //works if you dont include this in the useeffect

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

  const handleConf = (conf) => {
    let newTeams = [];
    if (conf === "w") {
      newTeams = permanentTeams.filter((team) => {
        return team.conf === "w";
      });
    } else if (conf == "e") {
      newTeams = permanentTeams.filter((team) => {
        return team.conf === "e";
      });
    } else {
      newTeams = permanentTeams;
    }
    setCurrentTeams(newTeams);
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button
          onClick={() => {
            handleConf("e");
          }}
        >
          East
        </Button>
        <Button
          onClick={() => {
            handleConf("w");
          }}
        >
          West
        </Button>
        <Button
          onClick={() => {
            handleConf("all");
          }}
        >
          NBA
        </Button>
      </ButtonGroup>
      <Standings teams={currentTeams} findTeam={findTeam} games={GAMES.data} />;
    </ThemeProvider>
  );
};
export default Simulator;
