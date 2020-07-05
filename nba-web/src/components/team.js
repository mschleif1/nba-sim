export default class Team {
  constructor(teamName, conf) {
    this.teamName = teamName;
    this.wins = 0.0;
    this.losses = 0.0;
    this.rating = 1000.0;
    this.winPct = 0.0;
    this.conf = conf;
    this.simRating = 1000.0;
    this.finalsWins = 0;
    this.confFinalsWins = 0;
    this.confSemisWins = 0;
    this.confQuartersWins = 0;
  }
  calcWinPct = () => {
    this.winPct = this.wins / (this.wins + this.losses);
  };
}
