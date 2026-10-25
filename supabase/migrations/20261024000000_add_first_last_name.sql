-- Agrega nombre y apellido manteniendo full_name sincronizado.
alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text;

-- Rellena nombre y apellido para usuarios existentes.
update public.profiles
set
  first_name = coalesce(first_name, nullif(split_part(btrim(full_name), ' ', 1), '')),
  last_name = coalesce(
    last_name,
    nullif(
      btrim(substr(btrim(full_name), length(split_part(btrim(full_name), ' ', 1)) + 1)),
      ''
    )
  )
where full_name is not null
  and btrim(full_name) <> ''
  and (first_name is null or last_name is null);

-- Mantiene full_name, first_name y last_name sincronizados en cada insert/update.
create or replace function public.sync_profile_names()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.full_name is null or btrim(new.full_name) = '' then
    new.full_name := nullif(btrim(concat_ws(' ', new.first_name, new.last_name)), '');
  end if;

  if new.first_name is null or btrim(new.first_name) = '' then
    new.first_name := nullif(split_part(btrim(new.full_name), ' ', 1), '');
  end if;

  if new.last_name is null or btrim(new.last_name) = '' then
    new.last_name := nullif(
      btrim(substr(btrim(new.full_name), length(split_part(btrim(new.full_name), ' ', 1)) + 1)),
      ''
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_profile_names on public.profiles;
create trigger trg_sync_profile_names
before insert or update on public.profiles
for each row execute function public.sync_profile_names();
