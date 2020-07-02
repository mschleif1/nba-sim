import * as JSOG from "jsog";
import games from "../components/games";
import Team from "../components/team";

const GAMES = JSOG.decode(games);

export const initialize = () => {
  const blankTeams = createTeamList();
  const filledTeams = setStats(blankTeams);
  return filledTeams;
};

const createTeamList = () => {
  let teams = [];
  for (let i = 0; i < GAMES.data.length; i++) {
    if (!containsTeam(teams, GAMES.data[i].Visitor.toLowerCase())) {
      const conf = GAMES.data[i].Vconf === "w" ? "w" : "e";
      teams.push(new Team(GAMES.data[i].Visitor.toLowerCase(), conf));
    }
  }
  return teams;
};

const setStats = (teams) => {
  console.log("how many times did i get in here;");

  for (let i = 0; i < GAMES.data.length; i++) {
    playGame(teams, GAMES.data[i]);
  }
  return teams;
};

const containsTeam = (teams, name) => {
  for (let i = 0; i < teams.length; i++) {
    if (name === teams[i].teamName) {
      return true;
    }
  }
  return false;
};

export const findTeam = (teams, name) => {
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

const playGame = (teams, game) => {
  let homeTeam = findTeam(teams, game.Home);
  let awayTeam = findTeam(teams, game.Visitor);
  if (game.VPTS > game.HPTS) {
    updateStats(awayTeam, homeTeam);
  } else {
    updateStats(homeTeam, awayTeam);
  }
};
