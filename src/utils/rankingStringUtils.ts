export const numberToRank = (rank: number): string => {
  switch (String(rank).slice(-2)) {
    case "11":
      return `${rank}th`;
    case "12":
      return `${rank}th`;
    case "13":
      return `${rank}th`;
  }
  switch (String(rank).slice(-1)) {
    case "1":
      return `${rank}st`;
    case "2":
      return `${rank}nd`;
    case "3":
      return `${rank}rd`;
    default:
      return `${rank}th`;
  }
};
