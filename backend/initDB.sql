CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,
    nom TEXT,
    identifiant TEXT UNIQUE,
    mot_de_passe TEXT
);

CREATE TABLE maison (
    id INTEGER PRIMARY KEY,
    code_identification TEXT UNIQUE,
    latitude REAL,
    longitude REAL,
    etat INTEGER,
    UNIQUE (latitude, longitude) 
);

CREATE TABLE pieces_maison (
    id INTEGER PRIMARY KEY,
    code_identification TEXT UNIQUE,
    etat INTEGER,
    maison_id INTEGER,
    temperature INTEGER,
    FOREIGN KEY (maison_id) REFERENCES maison (id)
);