import React, { useState } from "react";
import type { KanbanTask, KanbanViewProps } from "./KanbanBoard.types";
import { KanbanColumn } from "./KanbanColumn";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { TaskModal } from "./TaskModal";

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const drag = useDragAndDrop();
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(
    null
  );

  return (
    <>
      <div className="flex gap-6 p-6 overflow-x-auto">
        {columns.map((column) => {
          const colTasks = column.taskIds.map((id) => tasks[id]);

          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={colTasks}
              onAddTask={() =>
                onTaskCreate(column.id, {
                  id: `task-${Date.now()}`,
                  title: "New Task",
                  status: column.id,
                  createdAt: new Date(),
                })
              }
              onCardClick={(task) => setSelectedTask(task)}
              onDragStart={(taskId) => drag.handleDragStart(taskId, column.id)}
              onDragOverTask={(i) => drag.handleDragOver(column.id, i)}
              onDrop={() => drag.handleDrop(onTaskMove)}
            />
          );
        })}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      )}
    </>
  );
};
