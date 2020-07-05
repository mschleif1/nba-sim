import { quickSortRank } from "./createData";
const Chance = require("chance");
const chance = new Chance();

const simElo = (winTeam, loseTeam) => {
  const probWinTeam =
    1.0 / (1.0 + 10.0 ** ((loseTeam.simRating - winTeam.simRating) / 400.0));
  const probLoseTeam = 1.0 - probWinTeam;
  winTeam.simRating = winTeam.simRating + 32.0 * (1.0 - probWinTeam);
  loseTeam.simRating = loseTeam.simRating + 32.0 * (0.0 - probLoseTeam);
};

export const simulateGame = (team1, team2) => {
  const pTeam1 =
    1.0 / (1.0 + 10.0 ** ((team2.simRating - team1.simRating) / 400.0));
  const team1Win = chance.bool({ likelihood: pTeam1 * 100 });
  if (team1Win) {
    simElo(team1, team2);
  } else {
    simElo(team2, team1);
  }
  return team1Win;
};

export const simulateSeries = (team1, team2) => {
  let t1Wins = 0;
  let t2Wins = 0;
  let gameNum = 1;
  while (t1Wins < 4 && t2Wins < 4) {
    const x = simulateGame(team1, team2);
    if (x) {
      t1Wins++;
      console.log(
        team1.teamName,
        " has defeated ",
        team2.teamName,
        " in game number ",
        gameNum
      );
    } else {
      t2Wins++;
      console.log(
        team2.teamName,
        " has defeated ",
        team1.teamName,
        " in game number ",
        gameNum
      );
    }
    gameNum++;
  }
  return t1Wins === 4 ? team1 : team2;
};

export const createSeeds = (conf) => {
  const NUMTEAMS = 8;
  const orderedConf = quickSortRank(conf);
  let playoffTeams = [];
  for (let i = 0; i < NUMTEAMS; i++) {
    playoffTeams.push(orderedConf[i]);
  }
  return playoffTeams;
};

export const simulateConfPlayoffs = (conf, series) => {
  if (series === 1) {
    return simulateSeries(conf[0], conf[1]);
  }
  let roundResults = [];
  for (let i = 0; i < series; i++) {
    const highSeed = conf.length - 1 - i;
    roundResults.push(simulateSeries(conf[i], conf[highSeed]));
  }
  return simulateConfPlayoffs(roundResults, series / 2);
};
