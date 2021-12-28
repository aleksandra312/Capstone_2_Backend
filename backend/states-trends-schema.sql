CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  create_date TEXT NOT NULL,
  us_state TEXT NOT NULL,
  comment TEXT NOT NULL,
  is_relocate BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);