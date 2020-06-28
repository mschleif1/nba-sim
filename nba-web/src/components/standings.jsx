import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const Standings = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("wins");

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
    body: {
      color: theme.palette.secondary.main,
    },
  }))(TableRow);

  function createData(team, wins, losses, winpct, rating) {
    return { team, wins, losses, winpct, rating };
  }

  let rows = [];

  const DECTOSHOW = 2;
  props.teams.map((team) => {
    const newRow = createData(
      team.teamName,
      team.wins,
      team.losses,
      team.winPct.toFixed(DECTOSHOW),
      team.rating.toFixed(DECTOSHOW)
    );
    rows.push(newRow);
  });

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

  const classes = useStyles();

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const EnhancedTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  };

  const headCells = [
    { id: "team", numeric: false, disablePadding: true, label: "Team" },
    { id: "wins", numeric: true, disablePadding: false, label: "Wins" },
    { id: "losses", numeric: true, disablePadding: false, label: "Losses" },
    { id: "winPct", numeric: true, disablePadding: false, label: "Win PC" },
    { id: "elo", numeric: true, disablePadding: false, label: "Elo" },
  ];

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Team</StyledTableCell>
              <StyledTableCell align="right">Wins</StyledTableCell>
              <StyledTableCell align="right">Losses</StyledTableCell>
              <StyledTableCell align="right">Win&nbsp;Pct</StyledTableCell>
              <StyledTableCell align="right">Elo&nbsp;Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.team}>
                <StyledTableCell component="th" scope="row">
                  {row.team}
                </StyledTableCell>
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
