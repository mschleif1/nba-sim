import * as JSOG from "jsog";
import games from "../components/games";
import Team from "../components/team";

const GAMES = JSOG.decode(games);

export const initialize = () => {
  const blankTeams = createTeamList();
  const filledTeams = setStats(blankTeams);
  return filledTeams;
};

export const quickSortRank = (list) => {
  if (list.length <= 1) {
    return list;
  } else {
    let left = [];
    let right = [];
    let newArray = [];
    let pivot = list.pop();
    const length = list.length;

    for (let i = 0; i < length; i++) {
      //if the team is lower in the standings, push it to the right.
      if (compare(list[i], pivot) === 0) {
        right.push(list[i]);
      } else {
        left.push(list[i]);
      }
    }
    return newArray.concat([...quickSortRank(left)], pivot, [
      ...quickSortRank(right),
    ]);
  }
};

const compare = (t1, t2) => {
  if (t1.winPct === t2.winPct) {
    return headToHeadWinner(t1, t2) === 1 ? 1 : 0;
  } else {
    return t1.winPct > t2.winPct ? 1 : 0;
  }
};

const headToHeadWinner = (t1, t2) => {
  let t1Wins = 0,
    t2Wins = 0;
  GAMES.data.map((game) => {
    if (
      game.Visitor.toLowerCase() === t1.teamName &&
      game.Home.toLowerCase() === t2.teamName
    ) {
      if (game.VPTS > game.HPTS) {
        t1Wins++;
      } else t2Wins++;
    } else if (
      game.Visitor.toLowerCase() === t2.teamName &&
      game.Home.toLowerCase() === t1.teamName
    ) {
      if (game.VPTS > game.HPTS) {
        t2Wins++;
      } else {
        t1Wins++;
      }
    }
  });
  return t1Wins > t2Wins ? 1 : 0;
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

export const separateByConf = (teams) => {
  let west = [];
  let east = [];
  teams.forEach((team) => {
    if (team.conf === "w") {
      west.push(team);
    } else {
      east.push(team);
    }
  });
  return [east, west];
};
