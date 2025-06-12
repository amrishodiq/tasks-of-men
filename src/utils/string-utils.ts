export function formatDueIn(dueDate?: string): string | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const ms = due.getTime() - now.getTime();
  if (ms <= 0) return null;

  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days < 1) {
    const h = hours;
    const m = minutes % 60;
    let result = 'in ';
    if (h > 0) result += `${h} hour${h > 1 ? 's' : ''} `;
    if (m > 0 || h === 0) result += `${m} minute${m !== 1 ? 's' : ''}`;
    return result.trim();
  } else if (days < 7) {
    return `in ${days} day${days > 1 ? 's' : ''}`;
  }
  return null;
}