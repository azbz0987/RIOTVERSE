export type Role = 'top' | 'jungle' | 'mid' | 'bot' | 'support';

/** 1 = 쉬움 · 2 = 보통 · 3 = 어려움 */
export type Difficulty = 1 | 2 | 3;

export const ROLE_LABEL: Record<Role, string> = {
  top: '탑',
  jungle: '정글',
  mid: '미드',
  bot: '원딜',
  support: '서포터',
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: '쉬움',
  2: '보통',
  3: '어려움',
};

/** The fields a ChampionCard needs. The full data model arrives with the data step. */
export interface ChampionCardData {
  id: string;
  name: string;
  title: string;
  roles: Role[];
  difficulty: Difficulty;
  imageUrl: string;
}
