import { Bet } from "@/api/match/match.types";

export type GroupedBets = Record<string, Record<string | number, Bet[]>>;

export const formatMatchdayName = (matchday: string) => {
  if (!matchday || matchday === "undefined") return "Matchday";
  if (!isNaN(Number(matchday))) {
    return `Matchday ${matchday}`;
  }
  return matchday.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const groupBetsByStageAndMatchday = (bets: Bet[] = []): GroupedBets => {
  return bets.reduce<GroupedBets>((acc, bet) => {
    const stage = bet.match.stage || "OTHER";
    const matchday = bet.match.matchday;

    if (!acc[stage]) acc[stage] = {};
    if (!acc[stage][matchday]) acc[stage][matchday] = [];

    acc[stage][matchday].push(bet);
    return acc;
  }, {});
};
