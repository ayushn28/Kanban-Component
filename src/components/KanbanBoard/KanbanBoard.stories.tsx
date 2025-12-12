import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { KanbanBoard } from './KanbanBoard';
import { sampleColumns, sampleTasks } from './sampleData';
import type { KanbanColumn, KanbanTask } from './KanbanBoard.types';

const KanbanBoardWrapper: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(sampleColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(sampleTasks);

  const handleTaskCreate = (columnId: string, task: KanbanTask) => {
    setTasks(prev => ({ ...prev, [task.id]: task }));
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, taskIds: [...col.taskIds, task.id] }
          : col,
      ),
    );
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], ...updates },
    }));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => {
      const clone = { ...prev };
      delete clone[taskId];
      return clone;
    });

    setColumns(prev =>
      prev.map(col => ({
        ...col,
        taskIds: col.taskIds.filter(id => id !== taskId),
      })),
    );
  };

  const handleTaskMove = (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number,
  ) => {
    setColumns(prev => {
      const sourceCol = prev.find(col => col.id === fromColumn)!;
      const destCol = prev.find(col => col.id === toColumn)!;

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
      [taskId]: { ...prev[taskId], status: toColumn },
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onTaskCreate={handleTaskCreate}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskMove={handleTaskMove}
      />
    </div>
  );
};

const meta: Meta<typeof KanbanBoard> = {
  title: 'KANBAN/KanbanBoard',
  component: KanbanBoard,
  render: () => <KanbanBoardWrapper />,
};

export default meta;

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {};
