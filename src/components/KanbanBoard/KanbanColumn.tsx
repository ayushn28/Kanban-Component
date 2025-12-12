import React from "react";
import { KanbanCard } from "./KanbanCard";
import type { KanbanColumn as ColumnType, KanbanTask } from "./KanbanBoard.types";

interface Props {
  column: ColumnType;
  tasks: KanbanTask[];
  onAddTask: () => void;
  onCardClick: (task: KanbanTask) => void;
  onDragStart: (taskId: string) => void;
  onDragOverTask: (index: number) => void;
  onDrop: () => void;
}

export const KanbanColumn: React.FC<Props> = ({
  column,
  tasks,
  onAddTask,
  onCardClick,
  onDragStart,
  onDragOverTask,
  onDrop,
}) => {
  return (
    <section
      className="bg-neutral-50 border rounded-xl p-4 w-80 min-h-[80vh]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2 className="font-semibold text-lg mb-4">{column.title}</h2>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={task.id} onDragOver={() => onDragOverTask(index)}>
            <KanbanCard
              task={task}
              onClick={() => onCardClick(task)}
              onDragStart={() => onDragStart(task.id)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAddTask}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        + Add Task
      </button>
    </section>
  );
};
