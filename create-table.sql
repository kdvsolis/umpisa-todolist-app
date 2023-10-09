-- Table: public.up_users

-- DROP TABLE IF EXISTS public.up_users;
CREATE sequence up_users_id_seq

CREATE TABLE IF NOT EXISTS public.up_users
(
    id integer NOT NULL DEFAULT nextval('up_users_id_seq'::regclass),
    username character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    password character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT up_users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.up_users
    OWNER to postgres;

---------------------------------------------------------------------------------------------
-- Table: public.up_todolist

-- DROP TABLE IF EXISTS public.up_todolist;
CREATE sequence up_todolist_id_seq

CREATE TABLE IF NOT EXISTS public.up_todolist
(
    id integer NOT NULL DEFAULT nextval('up_todolist_id_seq'::regclass),
    task character varying(2048) COLLATE pg_catalog."default",
    status integer,
    user_id integer NOT NULL,
    CONSTRAINT up_todolist_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.up_users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.up_todolist
    OWNER to postgres;