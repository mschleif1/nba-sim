export default class Team {
  constructor(teamName) {
    this.teamName = teamName;
    this.wins = 0.0;
    this.losses = 0.0;
    this.rating = 1000.0;
    this.winPct = 0.0;
  }
  calcWinPct = () => {
    this.winPct = this.wins / (this.wins + this.losses);
  };
}
