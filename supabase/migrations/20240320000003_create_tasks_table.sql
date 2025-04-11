-- Criar tipos enum se não existirem
do $$
begin
  if not exists (select 1 from pg_type where typname = 'task_status') then
    create type task_status as enum ('backlog', 'todo', 'in_progress', 'in_review', 'done');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'task_priority') then
    create type task_priority as enum ('low', 'medium', 'high');
  end if;
end$$;

-- Criar tabela se não existir
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status task_status not null default 'backlog',
  priority task_priority not null default 'medium',
  due_date timestamp with time zone,
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table tasks enable row level security;

-- Criar políticas de segurança se não existirem
do $$
begin
  if not exists (select 1 from pg_policy where polname = 'Users can view own tasks') then
    create policy "Users can view own tasks"
      on tasks for select
      using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policy where polname = 'Users can insert own tasks') then
    create policy "Users can insert own tasks"
      on tasks for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policy where polname = 'Users can update own tasks') then
    create policy "Users can update own tasks"
      on tasks for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policy where polname = 'Users can delete own tasks') then
    create policy "Users can delete own tasks"
      on tasks for delete
      using (auth.uid() = user_id);
  end if;
end$$; 