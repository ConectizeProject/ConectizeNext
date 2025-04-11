"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { RoadmapCard } from "./RoadmapCard";
import { RoadmapColumn as RoadmapColumnType, Task } from "./types";

interface RoadmapColumnProps {
  column: RoadmapColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onUpdateColumn: (columnId: string, newTitle: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
}

export function RoadmapColumn({
  column,
  tasks,
  onAddTask,
  onUpdateTask,
  onUpdateColumn,
  onDeleteColumn,
  onTaskClick,
}: RoadmapColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const { setNodeRef, transform, transition } = useSortable({
    id: column.status,
    data: {
      type: "column",
      status: column.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && title !== column.title) {
      onUpdateColumn(column.id, title);
    }
    setIsEditing(false);
  };

  return (
    <Card className="flex flex-col gap-4 p-4" ref={setNodeRef} style={style}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {isEditing ? (
            <form onSubmit={handleTitleSubmit} className="flex-1 mr-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                autoFocus
              />
            </form>
          ) : (
            <h3
              className="text-lg font-semibold cursor-pointer hover:text-muted-foreground flex-1"
              onClick={() => setIsEditing(true)}
            >
              {column.title}
            </h3>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteColumn(column.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddTask}>
          Adicionar
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <RoadmapCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </Card>
  );
}
