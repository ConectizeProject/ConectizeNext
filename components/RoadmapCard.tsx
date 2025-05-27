"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Task } from "./types";

interface RoadmapCardProps {
  task: Task;
  className?: string;
  onUpdate: (updatedTask: Task) => void;
  onClick: () => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const taskFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().nullable(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().nullable(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function RoadmapCard({
  task,
  className,
  onUpdate,
  onClick,
}: RoadmapCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate?.toISOString().split("T")[0] || null,
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: TaskFormValues) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: values.title,
          description: values.description,
          priority: values.priority,
          due_date: values.dueDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", task.id);

      if (error) {
        console.error("Erro ao atualizar tarefa:", error);
        toast.error("Erro ao atualizar tarefa");
        return;
      }

      const updatedTask: Task = {
        ...task,
        title: values.title,
        description: values.description ?? "",
        priority: values.priority,
        dueDate: values.dueDate ? new Date(values.dueDate) : null,
        updatedAt: new Date(),
      };

      onUpdate(updatedTask);
      toast.success("Tarefa atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Erro ao atualizar tarefa");
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex flex-col gap-2 p-4 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        className
      )}
    >
      <div
        className="flex flex-col gap-2 cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded-md"
        onMouseDown={onClick}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{task.title}</h4>
          <Badge variant="secondary" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}

        {task.dueDate && (
          <p className="text-xs text-muted-foreground">
            Vence em: {task.dueDate.toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>
    </Card>
  );
}
