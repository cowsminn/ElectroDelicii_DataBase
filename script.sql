CREATE TABLE categorii
( parinte VARCHAR2(20) DEFAULT NULL
    , CONSTRAINT chk_parinte_lungime CHECK(LENGTH(parinte) >= 2)
    , CONSTRAINT fk_categorii_nume FOREIGN KEY(parinte) REFERENCES
    categorii(nume) ON DELETE CASCADE
    , nume VARCHAR2(20)
    , CONSTRAINT pk_categorii PRIMARY KEY(nume)
    , CONSTRAINT chk_categorie_lungime CHECK(LENGTH(nume) >= 2));

INSERT INTO categorii(nume, parinte) VALUES('Electronice', NULL);
INSERT INTO categorii(nume, parinte) VALUES('Desktop', 'Electronice');
INSERT INTO categorii(nume, parinte) VALUES('Tablete', 'Electronice');
INSERT INTO categorii(nume, parinte) VALUES('PC', 'Desktop');
INSERT INTO categorii(nume, parinte) VALUES('Monitoare', 'Desktop');
INSERT INTO categorii(nume, parinte) VALUES('Laptopuri', 'Desktop');
INSERT INTO categorii(nume, parinte) VALUES('Componente PC', 'PC');
INSERT INTO categorii(nume, parinte) VALUES('mini PC', 'PC');
INSERT INTO categorii(nume, parinte) VALUES('Aspiratoare', 'Electronice');
INSERT INTO categorii(nume, parinte) VALUES('Periferice', 'Desktop');
INSERT INTO categorii(nume, parinte) VALUES('Mouse-uri', 'Periferice');
INSERT INTO categorii(nume, parinte) VALUES('Tastaturi', 'Periferice');
INSERT INTO categorii(nume, parinte) VALUES('Casti', 'Periferice');



CREATE TABLE furnizori
( id_furnizor NUMBER(2) CONSTRAINT pk_furnizori PRIMARY KEY CHECK (id_furnizor >= 0)
    , nume VARCHAR2(20) NOT NULL CHECK (LENGTH(nume) >= 2)
    , judet VARCHAR2(20) NOT NULL CHECK (LENGTH(judet) >= 2)
    , oras VARCHAR2(20) NOT NULL CHECK (LENGTH(oras) >= 4)
    , strada VARCHAR2(20) NOT NULL CHECK (LENGTH(strada) >= 4)
    , numar VARCHAR2(10) NOT NULL
    , cod_postal VARCHAR2(6) NOT NULL CHECK (REGEXP_LIKE(cod_postal, '^[0-9]{6}$'))
    , CONSTRAINT uq_locatie UNIQUE (nume, judet, oras, strada, numar, cod_postal)
);

INSERT INTO furnizori(id_furnizor, nume, judet, oras, strada, numar, cod_postal) VALUES (0, 'HP', 'Iasi', 'Iasi', 'Palat', '7A', '700011');
INSERT INTO furnizori(id_furnizor, nume, judet, oras, strada, numar, cod_postal) VALUES (1, 'Dell', 'Vrancea', 'Focsani', 'Unirii', '25', '620125');
INSERT INTO furnizori(id_furnizor, nume, judet, oras, strada, numar, cod_postal) VALUES (2, 'Lenovo', 'Cluj', 'Cluj-Napoca', 'Memorandumului', '15', '400001');
INSERT INTO furnizori(id_furnizor, nume, judet, oras, strada, numar, cod_postal) VALUES (3, 'Acer', 'Timis', 'Timisoara', 'Libertatii', '7', '300105');
INSERT INTO furnizori(id_furnizor, nume, judet, oras, strada, numar, cod_postal) VALUES (4, 'Philips', 'Arges', 'Recea', 'Postei', '14', '173341');


CREATE TABLE produse
( id_produs NUMBER(3) CONSTRAINT pk_furnizori PRIMARY KEY CHECK (id_furnizor >= 0)
    , nume VARCHAR2(20) NOT NULL
    , stare VARCCHAR2(10) DEFAULT 'Utilizat', CHECK (stare IN('Defect', 'Utilizat', 'Nou')
    , CONSTRAINT uq_produs UNIQUE (nume, stare)
);

INSERT INTO produse(id_produs, nume, stare) VALUES(0, 'Laptop cu SSD', 'Nou');
INSERT INTO produse(id_produs, nume, stare) VALUES(1, 'PC i7 ', 'Utilizat');
INSERT INTO produse(id_produs, nume, stare) VALUES(2, 'Tableta Android', 'Defect');
INSERT INTO produse(id_produs, nume, stare) VALUES(3, 'Gaming Laptop RGB', 'Nou');
INSERT INTO produse(id_produs, nume, stare) VALUES(4, 'Aspirator Cyclone', 'Utilizat');


CREATE TABLE joburi
( id_job NUMBER(2)
    , CONSTRAINT pk_id_job PRIMARY KEY (id_job)
    , CONSTRAINT chk_id_job CHECK (id_job >= 0)
    , nume VARCHAR2(20) UNIQUE NOT NULL
    , salariu_minim NUMBER(6) NOT NULL CHECK (salariu_minim >= 2000)
    , salariu_maxim NUMBER(6) NOT NULL
    , CONSTRAINT chk_salariu_maxim CHECK (salariu_maxim > salariu_minim)
);

INSERT INTO joburi(id_job, nume, salariu_minim, salariu_maxim) VALUES(0, 'Comercial', 2400, 3000);
INSERT INTO joburi(id_job, nume, salariu_minim, salariu_maxim) VALUES(1, 'Curatenie', 3000, 3500);
INSERT INTO joburi(id_job, nume, salariu_minim, salariu_maxim) VALUES(2, 'Manager', 2800, 4000);


CREATE TABLE magazine
( id_magazin NUMBER(2)
    , CONSTRAINT pk_id_magazin PRIMARY KEY (id_magazin)
    , CONSTRAINT chk_id_magazin CHECK (id_magazin >= 0)
    , nume VARCHAR2(30) DEFAULT 'ElectroDelicii'  CHECK (REGEXP_LIKE(nume, 'ElectroDelicii', 'i'))
    , judet VARCHAR2(20) NOT NULL CHECK (LENGTH(judet) >= 2)
    , oras VARCHAR2(20) NOT NULL CHECK (LENGTH(oras) >= 4)
    , strada VARCHAR2(20) NOT NULL CHECK (LENGTH(strada) >= 4)
    , numar VARCHAR2(10) NOT NULL
    , cod_postal VARCHAR2(6) NOT NULL CHECK (REGEXP_LIKE(cod_postal, '^[0-9]{6}$'))
    , CONSTRAINT uq_magazin UNIQUE (judet, oras, strada, numar, cod_postal)
);

INSERT INTO magazine(id_magazin, judet, oras, strada, numar, cod_postal) VALUES (0, 'Arges', 'Pitesti', 'Papucesti', '3B', '000321');
INSERT INTO magazine(id_magazin, judet, oras, strada, numar, cod_postal) VALUES (1, 'Valcea', 'Brezoi', 'Ciresului', '21', '173582');
INSERT INTO magazine(id_magazin, judet, oras, strada, numar, cod_postal) VALUES (2, 'Cluj', 'Cluj-Napoca', 'Tisa', '4A', '400071');


CREATE TABLE donatii
( id_donatie NUMBER(4) CONSTRAINT pk_donatii PRIMARY KEY CHECK (id_donatie >= 0)
    , furnizor NUMBER(2)
    , produs NUMBER(2)
    , data DATE DEFAULT CURRENT_TIMESTAMP
    , CONSTRAINT fk_donatii_furnizor FOREIGN KEY (furnizor) REFERENCES furnizori(id_furnizor) ON DELETE CASCADE
    , CONSTRAINT fk_donatii_produs FOREIGN KEY (produs) REFERENCES produse(id_produs) ON DELETE CASCADE
);


INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (0, 0, 0, TO_DATE('2023-06-12', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (1, 0, 3, TO_DATE('2023-02-1', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (2, 1, 1, TO_DATE('2021-04-8', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (3, 2, 0, TO_DATE('2022-03-1', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (4, 2, 3, TO_DATE('2022-04-26', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (5, 4, 4, TO_DATE('2023-11-4', 'YYYY-MM-DD'));
INSERT INTO donatii(id_donatie, furnizor, produs) VALUES (6, 4, 2);
INSERT INTO donatii(id_donatie, furnizor, produs) VALUES (7, 4, 2);
INSERT INTO donatii(id_donatie, furnizor, produs, data) VALUES (8, 3, 2, TO_DATE('2020-01-19', 'YYYY-MM-DD'));


CREATE TABLE preturi
( magazin NUMBER(2)
    , produs NUMBER(2)
    , suma NUMBER(7, 2) CHECK (suma >= 1)
    , CONSTRAINT pk_preturi PRIMARY KEY (magazin, produs)
    , CONSTRAINT fk_preturi_magazin FOREIGN KEY (magazin) REFERENCES magazine(id_magazin) ON DELETE CASCADE
    , CONSTRAINT fk_preturi_produs FOREIGN KEY (produs) REFERENCES produse(id_produs) ON DELETE CASCADE
);


INSERT INTO preturi(magazin, produs, suma) VALUES (0, 0, 2100);
INSERT INTO preturi(magazin, produs, suma) VALUES (1, 0, 1800);
INSERT INTO preturi(magazin, produs, suma) VALUES (1, 1, 780);
INSERT INTO preturi(magazin, produs, suma) VALUES (1, 2, 210);
INSERT INTO preturi(magazin, produs, suma) VALUES (0, 2, 165.5);
INSERT INTO preturi(magazin, produs, suma) VALUES (0, 3, 3100);
INSERT INTO preturi(magazin, produs, suma) VALUES (0, 4, 320);
INSERT INTO preturi(magazin, produs, suma) VALUES (1, 4, 240);


CREATE TABLE clienti
( id_client NUMBER(4)
    , CONSTRAINT pk_clienti PRIMARY KEY(id_client)
    , CONSTRAINT chk_clienti CHECK (id_client >=0)
    , nume VARCHAR2(20) NOT NULL
    , prenume VARCHAR2(20) NOT NULL
    , nr_telefon VARCHAR2(10) NOT NULL CHECK (REGEXP_LIKE(nr_telefon, '^[0-9]{10}$') AND SUBSTR(nr_telefon, 1, 2) = '07')
    , CONSTRAINT uq_clienti UNIQUE (nume, prenume, nr_telefon)
);


INSERT INTO clienti(id_client, nume, prenume, nr_telefon) VALUES (0, 'Popescu', 'Vasilica', '0711123456');
INSERT INTO clienti(id_client, nume, prenume, nr_telefon) VALUES (1, 'Vasilescu', 'Florină', '0766123456');
INSERT INTO clienti(id_client, nume, prenume, nr_telefon) VALUES (2, 'Popa', 'Maria', '0722123456');
INSERT INTO clienti(id_client, nume, prenume, nr_telefon) VALUES (3, 'Radu', 'Marin', '0733123456');


CREATE TABLE tranzactii
( id_tranzactie NUMBER(4)
    , CONSTRAINT pk_tranzactii PRIMARY KEY(id_tranzactie)
    , CONSTRAINT chk_tranzactii CHECK (id_tranzactie >= 0)
    , client NUMBER(4)
    , CONSTRAINT fk_tranzactii_client FOREIGN KEY (client) REFERENCES clienti(id_client) ON DELETE CASCADE
    , produs NUMBER(3)
    , CONSTRAINT fk_tranzactii_produs FOREIGN KEY (produs) REFERENCES produse(id_produs) ON DELETE CASCADE
    , metoda_plata VARCHAR2(5) DEFAULT 'Cash', CHECK (metoda_plata IN ('Cash', 'Card'))
    , data DATE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (0, 0, 1, 'Cash', TO_DATE('2023-01-19', 'YYYY-MM-DD'));
INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (1, 0, 1, 'Card', TO_DATE('2023-01-19', 'YYYY-MM-DD'));
INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (2, 1, 3, 'Cash', TO_DATE('2022-08-19', 'YYYY-MM-DD'));
INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (3, 2, 4, 'Cash', TO_DATE('2023-11-10', 'YYYY-MM-DD'));
INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (4, 3, 3, 'Cash', TO_DATE('2023-12-8', 'YYYY-MM-DD'));
INSERT INTO tranzactii(id_tranzactie, client, produs, metoda_plata, data) VALUES (5, 3, 2, 'Card', TO_DATE('2022-12-8', 'YYYY-MM-DD'));


CREATE TABLE angajati
( id_angajat NUMBER(3)
    , CONSTRAINT pk_angajat PRIMARY KEY(id_angajat)
    , CONSTRAINT chk_angajati CHECK (id_angajat >=0)
    , magazin NUMBER(2)
    , CONSTRAINT fk_angajati_magazin FOREIGN KEY(magazin) REFERENCES magazine(id_magazin) ON DELETE CASCADE
    , nume VARCHAR2(20) NOT NULL
    , prenume VARCHAR2(20) NOT NULL
    , data_angajare DATE DEFAULT CURRENT_TIMESTAMP
    , salariu NUMBER(6) NOT NULL CHECK (salariu >= 2000)
    , CONSTRAINT uq_angajat UNIQUE (nume, prenume)
);


INSERT INTO angajati(id_angajat, magazin, nume, prenume, salariu) VALUES (0, 0, 'Popescu', 'Ion', 2900);
INSERT INTO angajati(id_angajat, magazin, nume, prenume, data_angajare, salariu) VALUES (1, 0, 'Elmo', 'Marian', TO_DATE('2020-11-19', 'YYYY-MM-DD'), 3100);
INSERT INTO angajati(id_angajat, magazin, nume, prenume, data_angajare, salariu) VALUES (2, 0, 'Saif', 'Alexandra', TO_DATE('2022-9-11', 'YYYY-MM-DD'), 2700);
INSERT INTO angajati(id_angajat, magazin, nume, prenume, salariu) VALUES (3, 1, 'Ion', 'Popescu', 3000);
INSERT INTO angajati(id_angajat, magazin, nume, prenume, data_angajare, salariu) VALUES (4, 1, 'Sarbus', 'Alin', TO_DATE('2023-11-8', 'YYYY-MM-DD'), 3000);


CREATE TABLE istoric_joburi
( data_angajare DATE DEFAULT CURRENT_TIMESTAMP NOT NULL
    , angajat NUMBER(4)
    , CONSTRAINT pk_istoric PRIMARY KEY (angajat, job)
    , nume_angajat VARCHAR2(40)NOT NULL
    , CONSTRAINT fk_istoric_joburi_angajat FOREIGN KEY (angajat) REFERENCES angajati(id_angajat) ON DELETE SET NULL
    , job NUMBER(2)
    , CONSTRAINT fk_istoric_joburi_job FOREIGN KEY (job) REFERENCES joburi(id_job) ON DELETE CASCADE
    , data_demisie DATE
    , CONSTRAINT chk_data_demisie CHECK ((data_demisie IS NULL) OR (data_demisie > data_angajare))
);


INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2020-11-19', 'YYYY-MM-DD'), 1, 'Elmo Marian', 0);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2020-11-19', 'YYYY-MM-DD'), 1, 'Elmo Marian', 1);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2022-9-11', 'YYYY-MM-DD'), 2, 'Saif Alexandra', 0);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2023-11-8', 'YYYY-MM-DD'), 4, 'Sarbus Alin', 2);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2024-01-6', 'YYYY-MM-DD'), 0, 'Popescu Ion', 2);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2024-01-6', 'YYYY-MM-DD'), 3, 'Ion Popescu', 0);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job) VALUES (TO_DATE('2024-01-6', 'YYYY-MM-DD'), 3, 'Ion Popescu', 1);
INSERT INTO istoric_joburi(data_angajare, angajat, nume_angajat, job, data_demisie) VALUES (TO_DATE('2022-9-11', 'YYYY-MM-DD'), 5, 'Mihai Cosmin', 2, TO_DATE('2023-11-18', 'YYYY-MM-DD'));


CREATE TABLE produse_categorii
( produs NUMBER(3)
    , CONSTRAINT fk_intermediar_produse FOREIGN KEY (produs) REFERENCES produse(id_produs) ON DELETE CASCADE
    , categorie VARCHAR(20)
    , CONSTRAINT pk_produse_categorii PRIMARY KEY (produs, categorie)
    , CONSTRAINT fk_intermediar_categorie FOREIGN KEY (categorie) REFERENCES categorii(nume) ON DELETE CASCADE
    , data DATE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produse_categorii(produs, categorie, data) VALUES(0,'Laptopuri', TO_DATE('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO produse_categorii(produs, categorie, data) VALUES(0,'Electronice', TO_DATE('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO produse_categorii(produs, categorie, data) VALUES(1,'Desktop', TO_DATE('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO produse_categorii(produs, categorie, data) VALUES(2,'Tablete', TO_DATE('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO produse_categorii(produs, categorie, data) VALUES(3,'Laptopuri', TO_DATE('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO produse_categorii(produs, categorie, data) VALUES(4,'Aspiratoare', TO_DATE('2024-01-01', 'YYYY-MM-DD'));