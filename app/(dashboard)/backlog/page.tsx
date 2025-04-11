"use client";

import { RoadmapColumn as Column } from "@/components/RoadmapColumn";
import { RoadmapColumn, Status, Task } from "@/components/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_COLUMNS = [
  { title: "Backlog", status: "backlog" as Status },
  { title: "A Fazer", status: "todo" as Status },
  { title: "Em Progresso", status: "in_progress" as Status },
  { title: "Em Revisão", status: "in_review" as Status },
  { title: "Concluído", status: "done" as Status },
];

interface User {
  id: string;
  full_name: string;
}

export default function Backlog() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<RoadmapColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskForm, setTaskForm] = useState<{
    title: string;
    description: string;
    userId: string | undefined;
  }>({
    title: "",
    description: "",
    userId: undefined,
  });
  const supabase = createClient();

  useEffect(() => {
    const loadUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, full_name")
        .order("full_name");

      if (error) {
        console.error("Erro ao carregar usuários:", error);
        return;
      }

      if (data) {
        setUsers(
          data.map((user) => ({
            id: user.id,
            full_name: user.full_name || "",
          }))
        );
      }
    };

    loadUsers();
  }, [supabase]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error("Usuário não autenticado");
          return;
        }

        // Carregar colunas
        const { data: columnsData, error: columnsError } = await supabase
          .from("roadmap_columns")
          .select("*")
          .order("position", { ascending: true });

        if (columnsError) {
          console.error("Erro ao carregar colunas:", columnsError);
          toast.error("Erro ao carregar colunas");
          return;
        }

        if (columnsData) {
          setColumns(
            columnsData.map((col) => ({
              id: col.id,
              title: col.title,
              status: col.status as Status,
              position: col.position,
              userId: col.user_id,
              createdAt: new Date(col.created_at),
              updatedAt: new Date(col.updated_at),
            }))
          );
        }

        // Carregar tarefas
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (tasksError) {
          console.error("Erro ao carregar tarefas:", tasksError);
          toast.error("Erro ao carregar tarefas");
          return;
        }

        if (tasksData) {
          setTasks(
            tasksData.map((task) => ({
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status as Status,
              priority: task.priority,
              dueDate: task.due_date ? new Date(task.due_date) : null,
              userId: task.user_id,
              createdAt: new Date(task.created_at),
              updatedAt: new Date(task.updated_at),
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [supabase]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === overId);
    const overColumn =
      over.data.current?.type === "column"
        ? (over.data.current.status as Status)
        : overTask?.status;

    if (!overColumn || activeTask.status === overColumn) return;

    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === activeId) {
          return { ...task, status: overColumn };
        }
        return task;
      });
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === overId);
    const overColumn =
      over.data.current?.type === "column"
        ? (over.data.current.status as Status)
        : overTask?.status;

    if (!overColumn || activeTask.status === overColumn) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .update({
          status: overColumn,
          updated_at: new Date().toISOString(),
        })
        .eq("id", activeId);

      if (error) {
        console.error("Erro ao atualizar tarefa:", error);
        toast.error("Erro ao atualizar tarefa");
        return;
      }

      toast.success("Tarefa atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Erro ao atualizar tarefa");
    }
  };

  const handleTaskClick = (task: Task) => {
    console.log("click");
    setSelectedTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || "",
      userId: task.userId,
    });
    setIsTaskDialogOpen(true);
  };

  const handleTaskUpdate = async () => {
    if (!selectedTask) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: taskForm.title,
          description: taskForm.description || null,
          user_id: taskForm.userId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedTask.id);

      if (error) {
        console.error("Erro ao atualizar tarefa:", error);
        toast.error("Erro ao atualizar tarefa");
        return;
      }

      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === selectedTask.id
            ? {
                ...task,
                title: taskForm.title,
                description: taskForm.description || null,
                userId: taskForm.userId,
                updatedAt: new Date(),
              }
            : task
        )
      );

      setIsTaskDialogOpen(false);
      toast.success("Tarefa atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Erro ao atualizar tarefa");
    }
  };

  const handleAddTask = async (columnStatus: Status) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const newTask = {
        title: "Nova tarefa",
        description: null,
        status: columnStatus,
        priority: "medium" as const,
        due_date: null,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("tasks")
        .insert(newTask)
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar tarefa:", error);
        toast.error("Erro ao criar tarefa");
        return;
      }

      const task: Task = {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status as Status,
        priority: data.priority,
        dueDate: data.due_date ? new Date(data.due_date) : null,
        userId: data.user_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setTasks((tasks) => [task, ...tasks]);
      toast.success("Tarefa criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("Erro ao criar tarefa");
    }
  };

  const handleUpdateColumn = async (columnId: string, newTitle: string) => {
    try {
      const { error } = await supabase
        .from("roadmap_columns")
        .update({
          title: newTitle,
          updated_at: new Date().toISOString(),
        })
        .eq("id", columnId);

      if (error) {
        console.error("Erro ao atualizar coluna:", error);
        toast.error("Erro ao atualizar coluna");
        return;
      }

      setColumns((columns) =>
        columns.map((column) =>
          column.id === columnId
            ? {
                ...column,
                title: newTitle,
                updatedAt: new Date(),
              }
            : column
        )
      );

      toast.success("Coluna atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar coluna:", error);
      toast.error("Erro ao atualizar coluna");
    }
  };

  const handleAddColumn = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const newColumn = {
        title: "Nova Coluna",
        status: `column_${Date.now()}`,
        position: columns.length,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("roadmap_columns")
        .insert(newColumn)
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar coluna:", error);
        toast.error("Erro ao criar coluna");
        return;
      }

      const column: RoadmapColumn = {
        id: data.id,
        title: data.title,
        status: data.status,
        position: data.position,
        userId: data.user_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setColumns((columns) => [...columns, column]);
      toast.success("Coluna criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar coluna:", error);
      toast.error("Erro ao criar coluna");
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    try {
      const { error } = await supabase
        .from("roadmap_columns")
        .delete()
        .eq("id", columnId);

      if (error) {
        console.error("Erro ao excluir coluna:", error);
        toast.error("Erro ao excluir coluna");
        return;
      }

      setColumns((columns) =>
        columns.filter((column) => column.id !== columnId)
      );
      toast.success("Coluna excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir coluna:", error);
      toast.error("Erro ao excluir coluna");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Backlog</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
          <SortableContext items={columns.map((col) => col.status)}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.status)}
                onAddTask={() => handleAddTask(column.status)}
                onUpdateTask={handleTaskUpdate}
                onUpdateColumn={handleUpdateColumn}
                onDeleteColumn={handleDeleteColumn}
                onTaskClick={handleTaskClick}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={taskForm.description || ""}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Responsável</label>
                <Select
                  value={taskForm.userId || ""}
                  onValueChange={(value) =>
                    setTaskForm({ ...taskForm, userId: value || undefined })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsTaskDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleTaskUpdate}>Salvar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
