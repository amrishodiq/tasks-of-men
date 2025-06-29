export function getDueLabel(dueDateStr: string): string {
  if (!dueDateStr) return 'No Due Date';
  const today = new Date();
  const dueDate = new Date(dueDateStr);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diff = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'Due Today';
  if (diff === 1) return 'Due Tomorrow';

  // Cek apakah dueDate masih di minggu ini
  const weekDay = today.getDay();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - weekDay));
  if (dueDate > today && dueDate <= endOfWeek) return 'Due This Week';

  if (dueDate > endOfWeek) return 'The Rest';

  if (dueDate < today) return 'Overdue';

  return '';
}