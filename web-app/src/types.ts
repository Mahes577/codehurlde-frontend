export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  category: string;
  companies: string[];
  solved?: boolean;
}

export interface Contest {
  id: string;
  title: string;
  startTime: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  rating: number;
  solvedCount: number;
  badge: string;
}

export interface CommunityMessage {
  id: string;
  user: string;
  avatarColor: string;
  time: string;
  text: string;
  codeSnippet?: string;
  channel: string;
}
