import React, { useState } from "react";
import { Modal } from "../../primitives/Modal";
import type { KanbanTask } from "./KanbanBoard.types";
import { Button } from "../../primitives/Button";

interface Props {
  task: KanbanTask;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<KanbanTask>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskModal: React.FC<Props> = ({
  task,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [title, setTitle] = useState(task.title);

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <Button
          variant="ghost"
          onClick={() => {
            onDelete(task.id);
            onClose();
          }}
        >
          Delete
        </Button>

        <Button
          onClick={() => {
            onUpdate(task.id, { title });
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
