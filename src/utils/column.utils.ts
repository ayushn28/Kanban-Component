export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number,
): string[] => {
  const result = [...tasks];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
