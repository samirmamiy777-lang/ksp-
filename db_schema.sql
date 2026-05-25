-- ============================================================
-- Курсовая работа: Музыкант (Вариант 17)
-- База данных PostgreSQL
-- ============================================================

-- ============================================================
-- ТАБЛИЦЫ
-- ============================================================

CREATE TABLE genre (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE musician (
    id            SERIAL PRIMARY KEY,
    full_name     VARCHAR(200) NOT NULL,
    birth_date    DATE,
    country       VARCHAR(100),
    biography     TEXT,
    genre_id      INT REFERENCES genre(id) ON DELETE SET NULL
);

CREATE TABLE album (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    release_year  INT CHECK (release_year BETWEEN 1900 AND 2100),
    musician_id   INT NOT NULL REFERENCES musician(id) ON DELETE CASCADE
);

CREATE TABLE track (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    duration_sec  INT CHECK (duration_sec > 0),
    album_id      INT NOT NULL REFERENCES album(id) ON DELETE CASCADE
);

-- ============================================================
-- ТЕСТОВЫЕ ДАННЫЕ
-- ============================================================

INSERT INTO genre (name, description) VALUES
    ('Rock',       'Гитарная музыка с мощным ритмом'),
    ('Jazz',       'Импровизационный стиль, возникший в начале XX века'),
    ('Pop',        'Популярная коммерческая музыка'),
    ('Classical',  'Академическая музыка европейской традиции'),
    ('Electronic', 'Музыка, созданная с помощью электронных инструментов');

INSERT INTO musician (full_name, birth_date, country, biography, genre_id) VALUES
    ('Freddie Mercury',  '1946-09-05', 'UK',     'Вокалист группы Queen, один из величайших рок-исполнителей', 1),
    ('Miles Davis',      '1926-05-26', 'USA',    'Легендарный джазовый трубач, новатор жанра', 2),
    ('Michael Jackson',  '1958-08-29', 'USA',    'Король поп-музыки, танцор и автор песен', 3),
    ('Ludwig van Beethoven', '1770-12-17', 'Germany', 'Великий композитор эпохи классицизма и романтизма', 4),
    ('Daft Punk',        '1993-01-01', 'France', 'Французский электронный дуэт, пионеры french house', 5),
    ('David Bowie',      '1947-01-08', 'UK',     'Рок-икона, известная постоянными творческими трансформациями', 1),
    ('John Coltrane',    '1926-09-23', 'USA',    'Саксофонист, один из самых влиятельных джазменов', 2),
    ('Madonna',          '1958-08-16', 'USA',    'Королева поп-музыки, икона 80-х и 90-х годов', 3);

INSERT INTO album (title, release_year, musician_id) VALUES
    ('A Night at the Opera',   1975, 1),
    ('News of the World',      1977, 1),
    ('Kind of Blue',           1959, 2),
    ('Bitches Brew',           1970, 2),
    ('Thriller',               1982, 3),
    ('Bad',                    1987, 3),
    ('Symphony No. 9',         1824, 4),
    ('Discovery',              2001, 5),
    ('Random Access Memories', 2013, 5),
    ('Ziggy Stardust',         1972, 6),
    ('Heroes',                 1977, 6),
    ('A Love Supreme',         1965, 7),
    ('Like a Prayer',          1989, 8);

INSERT INTO track (title, duration_sec, album_id) VALUES
    ('Bohemian Rhapsody',      354, 1),
    ('Love of My Life',        209, 1),
    ('We Will Rock You',       122, 2),
    ('We Are the Champions',   179, 2),
    ('So What',                562, 3),
    ('Blue in Green',          337, 3),
    ('Pharaoh''s Dance',       1080, 4),
    ('Miles Runs the Voodoo Down', 882, 4),
    ('Thriller',               358, 5),
    ('Beat It',                258, 5),
    ('Billie Jean',            294, 5),
    ('Bad',                    247, 6),
    ('Smooth Criminal',        256, 6),
    ('Ode to Joy',             720, 7),
    ('Harder Better Faster Stronger', 225, 8),
    ('Digital Love',           301, 8),
    ('Get Lucky',              248, 9),
    ('Instant Crush',          337, 9),
    ('Starman',                256, 10),
    ('Ziggy Stardust',         193, 10),
    ('Heroes',                 370, 11),
    ('A Love Supreme Pt. I',   493, 12),
    ('Like a Prayer',          339, 13),
    ('Express Yourself',       290, 13);

-- ============================================================
-- ПРЕДСТАВЛЕНИЯ (VIEW) — минимум 3
-- ============================================================

-- VIEW 1: Полная информация о треках с названием альбома и музыканта
CREATE OR REPLACE VIEW view_tracks_full AS
SELECT
    t.id          AS track_id,
    t.title       AS track_title,
    t.duration_sec,
    CONCAT(t.duration_sec / 60, ':', LPAD((t.duration_sec % 60)::TEXT, 2, '0')) AS duration_fmt,
    a.title       AS album_title,
    a.release_year,
    m.full_name   AS musician_name,
    g.name        AS genre_name
FROM track t
JOIN album    a ON t.album_id    = a.id
JOIN musician m ON a.musician_id = m.id
LEFT JOIN genre g ON m.genre_id  = g.id;

-- VIEW 2: Статистика по музыкантам (кол-во альбомов и треков)
CREATE OR REPLACE VIEW view_musician_stats AS
SELECT
    m.id,
    m.full_name,
    m.country,
    g.name        AS genre_name,
    COUNT(DISTINCT a.id)  AS album_count,
    COUNT(DISTINCT t.id)  AS track_count,
    COALESCE(SUM(t.duration_sec), 0) AS total_duration_sec
FROM musician m
LEFT JOIN genre    g ON m.genre_id   = g.id
LEFT JOIN album    a ON a.musician_id = m.id
LEFT JOIN track    t ON t.album_id   = a.id
GROUP BY m.id, m.full_name, m.country, g.name;

-- VIEW 3: Альбомы с количеством треков и суммарной длительностью
CREATE OR REPLACE VIEW view_albums_summary AS
SELECT
    a.id,
    a.title       AS album_title,
    a.release_year,
    m.full_name   AS musician_name,
    COUNT(t.id)   AS track_count,
    COALESCE(SUM(t.duration_sec), 0) AS total_duration_sec,
    CONCAT(
        COALESCE(SUM(t.duration_sec), 0) / 60, ':',
        LPAD((COALESCE(SUM(t.duration_sec), 0) % 60)::TEXT, 2, '0')
    ) AS total_duration_fmt
FROM album a
JOIN musician m ON a.musician_id = m.id
LEFT JOIN track t ON t.album_id  = a.id
GROUP BY a.id, a.title, a.release_year, m.full_name;

-- ============================================================
-- ФУНКЦИИ — минимум 3
-- ============================================================

-- FUNCTION 1: Получить все треки альбома по id альбома
CREATE OR REPLACE FUNCTION get_tracks_by_album(p_album_id INT)
RETURNS TABLE (
    track_id    INT,
    track_title VARCHAR,
    duration_sec INT,
    duration_fmt TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.title,
        t.duration_sec,
        CONCAT(t.duration_sec / 60, ':', LPAD((t.duration_sec % 60)::TEXT, 2, '0'))::TEXT
    FROM track t
    WHERE t.album_id = p_album_id
    ORDER BY t.id;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 2: Получить общее количество треков музыканта
CREATE OR REPLACE FUNCTION get_track_count_by_musician(p_musician_id INT)
RETURNS INT AS $$
DECLARE
    v_count INT;
BEGIN
    SELECT COUNT(t.id) INTO v_count
    FROM track t
    JOIN album a ON t.album_id = a.id
    WHERE a.musician_id = p_musician_id;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 3: Получить музыкантов по жанру
CREATE OR REPLACE FUNCTION get_musicians_by_genre(p_genre_name VARCHAR)
RETURNS TABLE (
    musician_id   INT,
    full_name     VARCHAR,
    country       VARCHAR,
    birth_date    DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT m.id, m.full_name, m.country, m.birth_date
    FROM musician m
    JOIN genre g ON m.genre_id = g.id
    WHERE LOWER(g.name) = LOWER(p_genre_name)
    ORDER BY m.full_name;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ХРАНИМЫЕ ПРОЦЕДУРЫ — минимум 3
-- ============================================================

-- PROCEDURE 1: Добавить нового музыканта с жанром (по названию жанра)
CREATE OR REPLACE PROCEDURE add_musician(
    p_full_name  VARCHAR,
    p_birth_date DATE,
    p_country    VARCHAR,
    p_biography  TEXT,
    p_genre_name VARCHAR
)
LANGUAGE plpgsql AS $$
DECLARE
    v_genre_id INT;
BEGIN
    SELECT id INTO v_genre_id FROM genre WHERE LOWER(name) = LOWER(p_genre_name);
    IF v_genre_id IS NULL THEN
        INSERT INTO genre(name) VALUES(p_genre_name) RETURNING id INTO v_genre_id;
    END IF;
    INSERT INTO musician(full_name, birth_date, country, biography, genre_id)
    VALUES (p_full_name, p_birth_date, p_country, p_biography, v_genre_id);
END;
$$;

-- PROCEDURE 2: Удалить музыканта и все его данные (альбомы, треки)
CREATE OR REPLACE PROCEDURE delete_musician_cascade(p_musician_id INT)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM musician WHERE id = p_musician_id;
    -- треки удалятся автоматически через ON DELETE CASCADE
END;
$$;

-- PROCEDURE 3: Переместить все треки из одного альбома в другой
CREATE OR REPLACE PROCEDURE move_tracks(
    p_from_album_id INT,
    p_to_album_id   INT
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE track SET album_id = p_to_album_id WHERE album_id = p_from_album_id;
END;
$$;

-- ============================================================
-- ТРИГГЕРЫ — минимум 3
-- ============================================================

-- Вспомогательная таблица для логов
CREATE TABLE IF NOT EXISTS audit_log (
    id          SERIAL PRIMARY KEY,
    table_name  VARCHAR(50),
    operation   VARCHAR(10),
    record_id   INT,
    changed_at  TIMESTAMP DEFAULT NOW(),
    details     TEXT
);

-- TRIGGER 1: Логировать добавление/удаление музыкантов
CREATE OR REPLACE FUNCTION trg_musician_audit()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log(table_name, operation, record_id, details)
        VALUES ('musician', 'INSERT', NEW.id, 'Added: ' || NEW.full_name);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log(table_name, operation, record_id, details)
        VALUES ('musician', 'DELETE', OLD.id, 'Deleted: ' || OLD.full_name);
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER musician_audit
AFTER INSERT OR DELETE ON musician
FOR EACH ROW EXECUTE FUNCTION trg_musician_audit();

-- TRIGGER 2: Запрет добавления трека с нулевой длительностью
CREATE OR REPLACE FUNCTION trg_check_track_duration()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.duration_sec <= 0 THEN
        RAISE EXCEPTION 'Длительность трека должна быть больше 0 секунд';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_track_duration
BEFORE INSERT OR UPDATE ON track
FOR EACH ROW EXECUTE FUNCTION trg_check_track_duration();

-- TRIGGER 3: Автоматически обновлять год альбома при вставке трека (guard)
-- При добавлении трека проверяем, что альбом существует
CREATE OR REPLACE FUNCTION trg_check_album_exists()
RETURNS TRIGGER AS $$
DECLARE
    v_exists INT;
BEGIN
    SELECT COUNT(*) INTO v_exists FROM album WHERE id = NEW.album_id;
    IF v_exists = 0 THEN
        RAISE EXCEPTION 'Альбом с id=% не существует', NEW.album_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_album_exists
BEFORE INSERT ON track
FOR EACH ROW EXECUTE FUNCTION trg_check_album_exists();
