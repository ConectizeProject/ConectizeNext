"use client";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { RoadmapColumn } from "./RoadmapColumn";
import { RoadmapColumn as RoadmapColumnType, Task } from "./types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type ColumnRow = Database["public"]["Tables"]["roadmap_columns"]["Row"];

const mapTaskFromDB = (task: TaskRow): Task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.due_date ? new Date(task.due_date) : null,
  userId: task.user_id,
  createdAt: new Date(task.created_at),
  updatedAt: new Date(task.updated_at),
});

const mapTaskToDB = (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
): Database["public"]["Tables"]["tasks"]["Insert"] => ({
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  due_date: task.dueDate?.toISOString() || null,
  user_id: task.userId,
});

const mapColumnFromDB = (column: ColumnRow): RoadmapColumnType => ({
  id: column.id,
  title: column.title,
  status: column.status,
  position: column.position,
  userId: column.user_id,
  createdAt: new Date(column.created_at),
  updatedAt: new Date(column.updated_at),
});

const columnFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
});

type ColumnFormValues = z.infer<typeof columnFormSchema>;

export function Roadmap() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<RoadmapColumnType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const supabase = createClient();

  const form = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      title: "",
    },
  });

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
          setColumns(columnsData.map(mapColumnFromDB));
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
          setTasks(tasksData.map(mapTaskFromDB));
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
        ? over.data.current.status
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
        ? over.data.current.status
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

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
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
            ? { ...column, title: newTitle, updatedAt: new Date() }
            : column
        )
      );

      toast.success("Coluna atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar coluna:", error);
      toast.error("Erro ao atualizar coluna");
    }
  };

  const addNewTask = async (status: Task["status"]) => {
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
        description: "",
        status,
        priority: "medium" as const,
        dueDate: null,
        userId: user.id,
      };

      const { data, error } = await supabase
        .from("tasks")
        .insert(mapTaskToDB(newTask))
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar tarefa:", error);
        toast.error("Erro ao criar tarefa");
        return;
      }

      if (!data) {
        toast.error("Erro ao criar tarefa");
        return;
      }

      setTasks((tasks) => [...tasks, mapTaskFromDB(data)]);
      toast.success("Tarefa criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("Erro ao criar tarefa");
    }
  };

  const addNewColumn = async (values: ColumnFormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const status = values.title.toLowerCase().replace(/\s+/g, "-");
      const position = columns.length + 1;

      const { data, error } = await supabase
        .from("roadmap_columns")
        .insert({
          title: values.title,
          status,
          position,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar coluna:", error);
        toast.error("Erro ao criar coluna");
        return;
      }

      if (!data) {
        toast.error("Erro ao criar coluna");
        return;
      }

      setColumns((columns) => [...columns, mapColumnFromDB(data)]);
      toast.success("Coluna criada com sucesso");
      setIsAddingColumn(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar coluna:", error);
      toast.error("Erro ao criar coluna");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddingColumn} onOpenChange={setIsAddingColumn}>
          <DialogTrigger asChild>
            <Button>Nova Coluna</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Coluna</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addNewColumn)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Criar</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={tasks
                .filter((task) => task.status === column.status)
                .map((task) => task.id)}
            >
              <RoadmapColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.status)}
                onAddTask={() => addNewTask(column.status)}
                onUpdateTask={handleUpdateTask}
                onUpdateColumn={handleUpdateColumn}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
