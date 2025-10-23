-- Create whatsapp_sessions table to store user WhatsApp connections
create table if not exists public.whatsapp_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  phone_number text,
  status text not null default 'disconnected', -- disconnected, connecting, connected, qr_ready
  qr_code text,
  session_data jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Create whatsapp_messages table to store messages
create table if not exists public.whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  chat_id text not null,
  message_id text not null,
  from_number text not null,
  to_number text not null,
  body text,
  timestamp bigint not null,
  is_from_me boolean not null default false,
  has_media boolean not null default false,
  media_url text,
  created_at timestamp with time zone default now(),
  unique(user_id, message_id)
);

-- Create whatsapp_contacts table to store contacts
create table if not exists public.whatsapp_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contact_id text not null,
  name text,
  phone_number text not null,
  profile_pic_url text,
  last_message_at timestamp with time zone,
  unread_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, contact_id)
);

-- Enable Row Level Security
alter table public.whatsapp_sessions enable row level security;
alter table public.whatsapp_messages enable row level security;
alter table public.whatsapp_contacts enable row level security;

-- RLS Policies for whatsapp_sessions
create policy "Users can view their own sessions"
  on public.whatsapp_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on public.whatsapp_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sessions"
  on public.whatsapp_sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on public.whatsapp_sessions for delete
  using (auth.uid() = user_id);

-- RLS Policies for whatsapp_messages
create policy "Users can view their own messages"
  on public.whatsapp_messages for select
  using (auth.uid() = user_id);

create policy "Users can insert their own messages"
  on public.whatsapp_messages for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own messages"
  on public.whatsapp_messages for update
  using (auth.uid() = user_id);

create policy "Users can delete their own messages"
  on public.whatsapp_messages for delete
  using (auth.uid() = user_id);

-- RLS Policies for whatsapp_contacts
create policy "Users can view their own contacts"
  on public.whatsapp_contacts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own contacts"
  on public.whatsapp_contacts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own contacts"
  on public.whatsapp_contacts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own contacts"
  on public.whatsapp_contacts for delete
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index if not exists idx_whatsapp_sessions_user_id on public.whatsapp_sessions(user_id);
create index if not exists idx_whatsapp_messages_user_id on public.whatsapp_messages(user_id);
create index if not exists idx_whatsapp_messages_chat_id on public.whatsapp_messages(chat_id);
create index if not exists idx_whatsapp_contacts_user_id on public.whatsapp_contacts(user_id);
