CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  create_date DATE NOT NULL,
  comment TEXT NOT NULL,
  is_relocate BOOLEAN NOT NULL DEFAULT FALSE
);