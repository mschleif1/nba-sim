import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { findTeam, quickSortRank } from "../algorithms/createData";
import { GAMES } from "./simulator";

const Standings = ({ teams }) => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 17,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const createData = (rank, team, wins, losses, winpct, rating) => {
    return { rank, team, wins, losses, winpct, rating };
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

  const createRows = () => {
    let rowList = [];
    let temp = [...teams];
    const newList = quickSortRank(temp);
    const DECTOSHOW = 2;
    for (let i = 0; i < newList.length; i++) {
      const team = newList[i];
      const newRow = createData(
        i + 1,
        team.teamName,
        team.wins,
        team.losses,
        team.winPct.toFixed(DECTOSHOW),
        team.rating.toFixed(DECTOSHOW)
      );
      rowList.push(newRow);
    }
    return rowList;
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="right">Team</StyledTableCell>
              <StyledTableCell align="right">Wins</StyledTableCell>
              <StyledTableCell align="right">Losses</StyledTableCell>
              <StyledTableCell align="right">Win&nbsp;Pct</StyledTableCell>
              <StyledTableCell align="right">Elo&nbsp;Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {createRows().map((row) => (
              <StyledTableRow key={row.team}>
                <StyledTableCell component="th" scope="row">
                  {row.rank}
                </StyledTableCell>
                <StyledTableCell align="right">{row.team}</StyledTableCell>
                <StyledTableCell align="right">{row.wins}</StyledTableCell>
                <StyledTableCell align="right">{row.losses}</StyledTableCell>
                <StyledTableCell align="right">{row.winpct}</StyledTableCell>
                <StyledTableCell align="right">{row.rating}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Standings;
