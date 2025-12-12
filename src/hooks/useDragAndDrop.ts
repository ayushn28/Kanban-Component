import { useState, useCallback } from "react";

export const useDragAndDrop = () => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [fromColumnId, setFromColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((taskId: string, columnId: string) => {
    setDraggedTaskId(taskId);
    setFromColumnId(columnId);
  }, []);

  const handleDragOver = useCallback((columnId: string, index: number) => {
    setOverColumnId(columnId);
    setOverIndex(index);
  }, []);

  const handleDrop = useCallback(
    (onTaskMove: Function) => {
      if (
        draggedTaskId &&
        fromColumnId &&
        overColumnId &&
        overIndex !== null
      ) {
        onTaskMove(draggedTaskId, fromColumnId, overColumnId, overIndex);
      }

      setDraggedTaskId(null);
      setFromColumnId(null);
      setOverColumnId(null);
      setOverIndex(null);
    },
    [draggedTaskId, fromColumnId, overColumnId, overIndex]
  );

  return { handleDragStart, handleDragOver, handleDrop };
};
