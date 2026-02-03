export const XP_PER_SESSION = 50;

/**
 * Calculates the level based on total XP.
 * Formula: Level = Math.floor(xp / 100) + 1
 * Level 1: 0-99 XP
 * Level 2: 100-199 XP
 * Level 3: 200-299 XP
 */
export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function calculateProgressToNextLevel(xp: number): { current: number; max: number } {
  const level = getLevelFromXP(xp);
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;

  const progressInLevel = xp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel; // Always 100 in this linear model

  return {
    current: progressInLevel,
    max: xpNeededForLevel
  };
}

export interface LevelUpResult {
  newXP: number;
  newLevel: number;
  leveledUp: boolean;
  xpAdded: number;
}

export function addSessionXP(currentXP: number, currentLevel: number): LevelUpResult {
  const newXP = currentXP + XP_PER_SESSION;
  const calculatedLevel = getLevelFromXP(newXP);

  // Ensure we don't de-level if we change formula later
  const newLevel = Math.max(calculatedLevel, currentLevel);
  const leveledUp = newLevel > currentLevel;

  return {
    newXP,
    newLevel,
    leveledUp,
    xpAdded: XP_PER_SESSION
  };
}
