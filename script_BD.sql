DROP DATABASE IF EXISTS ejemplonode;
CREATE DATABASE ejemplonode;

USE ejemplonode;

CREATE TABLE movie (
    id BINARY(16) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(3,2) UNSIGNED NOT NULL
);



CREATE TABLE genre(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres(
    movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id,genre_id)
);


INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UNHEX(REPLACE(UUID(),'-','')), "Inception", 2010, "Christopher Nolan", 180, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 6.9),
(UNHEX(REPLACE(UUID(),'-','')), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
(UNHEX(REPLACE(UUID(),'-','')), "Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9);


INSERT INTO movie_genres(movie_id,genre_id) VALUES
((SELECT id FROM movie WHERE title='Inceptino'),(SELECT id FROM genre WHERE name='Sci-Fi')),
((SELECT id FROM movie WHERE title='Inceptino'),(SELECT id FROM genre WHERE name='Action')),
((SELECT id FROM movie WHERE title='Pulp Fiction'),(SELECT id FROM genre WHERE name='Drama')),
((SELECT id FROM movie WHERE title='The Dark Knight'),(SELECT id FROM genre WHERE name='Action'));

SELECT CONCAT(
        LPAD(HEX(SUBSTR(id, 1, 4)), 8, '0'), '-',
        LPAD(HEX(SUBSTR(id, 5, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 7, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 9, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 11, 6)), 12, '0')
    ) AS id FROM movie;
SELECT * FROM genre;
SELECT * FROM movie_genres;