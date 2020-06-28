import { Bracket } from "react-tournament-bracket";
import * as React from "react";
import * as _ from "underscore";
import DEMO_DATA from "./data";
import * as JSOG from "jsog";

const Tourney = () => {
  const GAMES = JSOG.decode(DEMO_DATA);
  const ROOT = _.findWhere(GAMES, {
    id: "35b0745d-ef13-4255-8c40-c9daa95e4cc4",
  });

  return <Bracket game={ROOT} />;
};

export default Tourney;
