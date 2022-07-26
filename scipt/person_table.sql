create table if not exists person
(
    id         uuid      default gen_random_uuid() not null
        constraint "PK_5fdaf670315c4b7e70cce85daa3"
            primary key,
    created_at timestamp default now()             not null,
    updated_at timestamp default now()             not null,
    deleted_at timestamp,
    name       varchar                             not null,
    birth_date timestamp                           not null
);

