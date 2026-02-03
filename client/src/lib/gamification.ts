export const XP_PER_SESSION = 50;
export const CARDS_PER_SESSION = 10;

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function calculateProgressToNextLevel(xp: number): { current: number; max: number } {
  const level = getLevelFromXP(xp);
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;

  const progressInLevel = xp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;

  return {
    current: progressInLevel,
    max: xpNeededForLevel
  };
}
