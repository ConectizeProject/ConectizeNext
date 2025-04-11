-- Criar tabela de colunas do roadmap
create table if not exists roadmap_columns (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  status text not null unique,
  position integer not null,
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table roadmap_columns enable row level security;

-- Criar políticas de segurança
create policy "Users can view own columns"
  on roadmap_columns for select
  using (auth.uid() = user_id);

create policy "Users can insert own columns"
  on roadmap_columns for insert
  with check (auth.uid() = user_id);

create policy "Users can update own columns"
  on roadmap_columns for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own columns"
  on roadmap_columns for delete
  using (auth.uid() = user_id);

-- Inserir colunas padrão para usuários existentes
insert into roadmap_columns (title, status, position, user_id)
select 
  title,
  status,
  position,
  user_id
from (
  select 'Backlog' as title, 'backlog' as status, 0 as position, id as user_id from auth.users
  union all
  select 'A Fazer', 'todo', 1, id from auth.users
  union all
  select 'Em Progresso', 'in_progress', 2, id from auth.users
  union all
  select 'Em Revisão', 'in_review', 3, id from auth.users
  union all
  select 'Concluído', 'done', 4, id from auth.users
) as default_columns;

-- Criar trigger para inserir colunas padrão para novos usuários
create or replace function create_default_columns()
returns trigger as $$
begin
  insert into public.roadmap_columns (title, status, position, user_id)
  values
    ('Backlog', 'backlog', 0, new.id),
    ('A Fazer', 'todo', 1, new.id),
    ('Em Progresso', 'in_progress', 2, new.id),
    ('Em Revisão', 'in_review', 3, new.id),
    ('Concluído', 'done', 4, new.id);
  return new;
end;
$$ language plpgsql security definer;
