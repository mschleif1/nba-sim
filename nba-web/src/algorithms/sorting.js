const headToHeadWinner = (t1, t2) => {
  let t1Wins = 0,
    t2Wins = 0;
  games.map((game) => {
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

const compare = (t1, t2) => {
  if (t1.winPct === t2.winPct) {
    return headToHeadWinner(t1, t2) === 1 ? 1 : 0;
  } else {
    return t1.winPct > t2.winPct ? 1 : 0;
  }
};

const quickSortRank = (list) => {
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
        left.push(list[i]);
      } else {
        right.push(list[i]);
      }
    }
    return newArray.concat(quickSortRank(left), pivot, quickSortRank(right));
  }
};

export const sort = (teams) => {
  let rowList = [];
  const newList = quickSortRank(teams).reverse();
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
  setRows(rowList);
};
