export default class Team {
  constructor(teamName, conf) {
    this.teamName = teamName;
    this.wins = 0.0;
    this.losses = 0.0;
    this.rating = 1000.0;
    this.winPct = 0.0;
    this.conf = conf;
  }
  calcWinPct = () => {
    this.winPct = this.wins / (this.wins + this.losses);
  };
}
