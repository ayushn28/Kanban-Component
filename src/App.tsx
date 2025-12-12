import React, { useState } from "react";

import  {KanbanBoard}  from "./components/KanbanBoard/KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./components/KanbanBoard/KanbanBoard.types";
import { sampleColumns, sampleTasks } from "./components/KanbanBoard/sampleData";


const App: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(sampleColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(sampleTasks);

  // ✅ ADD TASK
  const handleTaskCreate = (columnId: string, task: KanbanTask) => {
    setTasks(prev => ({
      ...prev,
      [task.id]: task,
    }));

    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, taskIds: [...col.taskIds, task.id] }
          : col,
      ),
    );
  };

  // ✅ UPDATE TASK
  const handleTaskUpdate = (
    taskId: string,
    updates: Partial<KanbanTask>,
  ) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], ...updates },
    }));
  };

  // ✅ DELETE TASK
  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => {
      const copy = { ...prev };
      delete copy[taskId];
      return copy;
    });

    setColumns(prev =>
      prev.map(col => ({
        ...col,
        taskIds: col.taskIds.filter(id => id !== taskId),
      })),
    );
  };

  // ✅ DRAG & DROP MOVE
  const handleTaskMove = (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number,
  ) => {
    setColumns(prev => {
      const sourceCol = prev.find(c => c.id === fromColumn)!;
      const destCol = prev.find(c => c.id === toColumn)!;

      const sourceTaskIds = sourceCol.taskIds.filter(id => id !== taskId);
      const destTaskIds = [...destCol.taskIds];
      destTaskIds.splice(newIndex, 0, taskId);

      return prev.map(col => {
        if (col.id === fromColumn)
          return { ...col, taskIds: sourceTaskIds };
        if (col.id === toColumn)
          return { ...col, taskIds: destTaskIds };
        return col;
      });
    });

    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        status: toColumn,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-neutral-100 p-6">
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onTaskCreate={handleTaskCreate}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskMove={handleTaskMove}
      />
    </main>
  );
};

export default App;
