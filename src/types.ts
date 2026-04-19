export type Athlete = {
  id: string;
  name: string;
  age: number;
  position: string;
  currentClub: string;
  aiValuation: number;
  tokenPrice: number;
  imageUrl: string;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
};

export type PortfolioItem = {
  athleteId: string;
  shares: number;
  averageBuyPrice: number;
};

export type UserProfile = {
  id: string;
  name: string;
  walletAddress: string;
  balances: {
    cNGN: number;
    aCoins: number;
  };
  portfolio: PortfolioItem[];
};
