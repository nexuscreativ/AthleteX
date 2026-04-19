import { Athlete, UserProfile } from "../types";

export const mockAthletes: Athlete[] = [
  {
    id: "a1",
    name: "Tunde Olatunji",
    age: 19,
    position: "Forward",
    currentClub: "Lagos Academy",
    aiValuation: 2500000,
    tokenPrice: 25.5,
    imageUrl: "https://picsum.photos/seed/a1/200/200",
    stats: { pace: 88, shooting: 75, passing: 60, dribbling: 82, defending: 30, physical: 70 },
  },
  {
    id: "a2",
    name: "Emeka Obi",
    age: 21,
    position: "Midfielder",
    currentClub: "Kano Pillars Res.",
    aiValuation: 1800000,
    tokenPrice: 18.0,
    imageUrl: "https://picsum.photos/seed/a2/200/200",
    stats: { pace: 70, shooting: 65, passing: 85, dribbling: 78, defending: 60, physical: 80 },
  },
  {
    id: "a3",
    name: "Chinedu Eze",
    age: 18,
    position: "Defender",
    currentClub: "Enugu Rangers Youth",
    aiValuation: 3200000,
    tokenPrice: 32.0,
    imageUrl: "https://picsum.photos/seed/a3/200/200",
    stats: { pace: 85, shooting: 40, passing: 65, dribbling: 60, defending: 88, physical: 90 },
  },
  {
    id: "a4",
    name: "Ibrahim Musa",
    age: 20,
    position: "Goalkeeper",
    currentClub: "Rivers United",
    aiValuation: 1500000,
    tokenPrice: 15.0,
    imageUrl: "https://picsum.photos/seed/a4/200/200",
    stats: { pace: 50, shooting: 20, passing: 60, dribbling: 30, defending: 80, physical: 85 },
  },
];

export const mockUser: UserProfile = {
  id: "u1",
  name: "Investor_99",
  walletAddress: "GzX...9pL",
  balances: {
    cNGN: 500000,
    aCoins: 1250,
  },
  portfolio: [
    { athleteId: "a1", shares: 100, averageBuyPrice: 20.0 },
    { athleteId: "a2", shares: 500, averageBuyPrice: 15.5 },
  ],
};
