import React, { useState, useEffect } from "react";
import games from "./games";
import * as JSOG from "jsog";
import Standings from "./standings";
import Predictions from "./predictions";
import Team from "./team";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { initialize } from "../algorithms/createData";

export const GAMES = JSOG.decode(games);

const Simulator = () => {
  const TEAMS = initialize();
  const [currentTeams, setCurrentTeams] = useState([...TEAMS]);

  // useEffect(() => {
  //   setCurrentTeams(TEAMS);
  // }, []);

  useEffect(() => {
    console.log("currentTeams changed!");
  }, [currentTeams]);

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
      newTeams = TEAMS.filter((team) => {
        return team.conf === "w";
      });
    } else if (conf == "e") {
      newTeams = TEAMS.filter((team) => {
        return team.conf === "e";
      });
    } else {
      newTeams = TEAMS;
    }
    setCurrentTeams([...newTeams]);
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
      <Standings teams={currentTeams} />
      <Predictions />
    </ThemeProvider>
  );
};
export default Simulator;
