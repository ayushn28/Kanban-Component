import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";

interface Props {
  task: KanbanTask;
  onClick: () => void;
  onDragStart: () => void;
}

export const KanbanCard: React.FC<Props> = ({
  task,
  onClick,
  onDragStart,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="p-3 bg-white border rounded-lg shadow cursor-pointer"
    >
      <p className="font-medium">{task.title}</p>

      {task.dueDate && (
        <p className="text-xs text-red-600">
          Due: {task.dueDate.toDateString()}
        </p>
      )}
    </div>
  );
};
