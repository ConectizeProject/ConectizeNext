-- Criar tabela de notificações
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  origin text not null,
  type text not null,
  message text not null,
  data jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table notifications enable row level security;

-- Criar políticas de segurança
create policy "Users can view notifications"
  on notifications for select
  using (true);

create policy "Users can insert notifications"
  on notifications for insert
  with check (true);

create policy "Users can update notifications"
  on notifications for update
  using (true)
  with check (true);

create policy "Users can delete notifications"
  on notifications for delete
  using (true);




