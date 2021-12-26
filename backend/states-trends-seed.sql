INSERT INTO comments (username, create_date, us_state, comment, is_relocate)
VALUES ('testuser1',
        '2021-12-25',
        'California',
        'California is my favorite state',
        TRUE);


INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'FirstName',
        'LastName',
        'test1@email.com'),
       ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'FirstName',
        'LastName',
        'test2@email.com');