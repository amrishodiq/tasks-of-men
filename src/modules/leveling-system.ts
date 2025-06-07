import type { Task } from '../types/task.js';

export function getTaskExperience(task: Task): number {
  switch (task.priority) {
    case 'high':
      return 50;
    case 'medium':
      return 20;
    case 'low':
    default:
      return 10;
  }
}

// XP yang dibutuhkan untuk naik ke level berikutnya
export function xpForLevel(level: number): number {
  // Level 1 ke 2: 100, 2 ke 3: 150, 3 ke 4: 200, dst.
  return 100 + (level - 1) * 50;
}

// Total XP kumulatif untuk mencapai level tertentu
export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += xpForLevel(i);
  }
  return total;
}

// Mendapatkan level dari total XP
export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  while (totalXp >= totalXpForLevel(level + 1)) {
    level++;
  }
  return level;
}

