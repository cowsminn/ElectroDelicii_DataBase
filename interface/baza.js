import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');  
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        res.render('baza');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/angajati', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM angajati");
        res.render('angajati', { angajati: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/magazine', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM magazine");
        res.render('magazine', { magazine: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/produse', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM produse");
        res.render('produse', { produse: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/joburi', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM joburi");
        res.render('joburi', { joburi: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/preturi', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM preturi");
        res.render('preturi', { preturi: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/istoric_joburi', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM istoric_joburi");
        res.render('istoric_joburi', { istoric_joburi: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/categorii', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM categorii");
        res.render('categorii', { categorii: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clienti', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clienti");
        res.render('clienti', { clienti: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tranzactii', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tranzactii");
        res.render('tranzactii', { tranzactii: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/furnizori', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM furnizori");
        res.render('furnizori', { furnizori: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/donatii', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM donatii");
        res.render('donatii', { donatii: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/produse_categorii', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM produse_categorii");
        res.render('produse_categorii', { produse_categorii: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/// EDIT

app.get('/angajati/edit/:id', async (req, res) => {
    try {
        const id_angajat = req.params.id;
        const [rows] = await pool.query("SELECT * FROM angajati WHERE id_angajat = ?", [id_angajat]);
        res.render('edits/edit_angajati', { angajat: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/angajati/edit/:id', async (req, res) => {
    try {
        const id_angajat = req.params.id;
        const { nume, prenume, magazin, data_angajare, salariu } = req.body;

        await pool.query(
            "UPDATE angajati SET nume = ?, prenume = ?, magazin = ?, data_angajare = ?, salariu = ? WHERE id_angajat = ?",
            [nume, prenume, magazin, data_angajare, salariu, id_angajat]
        );

        res.redirect('/angajati');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clienti/edit/:id', async (req, res) => {
    try {
        const id_client = req.params.id;
        const [rows] = await pool.query("SELECT * FROM clienti WHERE id_client = ?", [id_client]);
        res.render('edits/edit_clienti', { client: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/clienti/edit/:id', async (req, res) => {
    try {
        const id_client = req.params.id;
        const { nume, prenume, nr_telefon} = req.body;

        await pool.query(
            "UPDATE clienti SET nume = ?, prenume = ?, nr_telefon = ? WHERE id_client = ?",
            [nume, prenume, nr_telefon, id_client]
        );

        res.redirect('/clienti');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/donatii/edit/:id', async (req, res) => {
    try {
        const id_donatie = req.params.id;
        const [rows] = await pool.query("SELECT * FROM donatii WHERE id_donatie = ?", [id_donatie]);
        res.render('edits/edit_donatii', { donatie: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/donatii/edit/:id', async (req, res) => {
    try {
        const id_donatie = req.params.id;
        const { furnizor, produs, data} = req.body;

        await pool.query(
            "UPDATE donatii SET furnizor = ?, produs = ?, data = ? WHERE id_donatie = ?",
            [furnizor, produs, data, id_donatie]
        );

        res.redirect('/donatii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/furnizori/edit/:id', async (req, res) => {
    try {
        const id_furnizor = req.params.id;
        const [rows] = await pool.query("SELECT * FROM furnizori WHERE id_furnizor = ?", [id_furnizor]);
        res.render('edits/edit_furnizori', { furnizor: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/furnizori/edit/:id', async (req, res) => {
    try {
        const id_furnizor = req.params.id;
        const { nume, judet, oras, strada, numar, cod_postal } = req.body;

        await pool.query(
            "UPDATE furnizori SET nume = ?, judet = ?, oras = ?, strada = ?, numar = ?, cod_postal = ? WHERE id_furnizor = ?",
            [nume, judet, oras, strada, numar, cod_postal, id_furnizor]
        );

        res.redirect('/furnizori');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/magazine/edit/:id', async (req, res) => {
    try {
        const id_magazin = req.params.id;
        const [rows] = await pool.query("SELECT * FROM magazine WHERE id_magazin = ?", [id_magazin]);
        res.render('edits/edit_magazine', { magazin: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/magazine/edit/:id', async (req, res) => {
    try {
        const id_magazin = req.params.id;
        const { nume, judet, oras, strada, numar, cod_postal } = req.body;

        await pool.query(
            "UPDATE magazine SET nume = ?, judet = ?, oras = ?, strada = ?, numar = ?, cod_postal = ? WHERE id_magazin = ?",
            [nume, judet, oras, strada, numar, cod_postal, id_magazin]
        );

        res.redirect('/magazine');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/istoric_joburi/edit/:id', async (req, res) => {
//     try {
//         const data_angajare = req.params.id;
//         const [rows] = await pool.query("SELECT * FROM istoric_joburi WHERE data_angajare = ?", [data_angajare]);
//         res.render('edits/edit_istoric_joburi', { istoric: rows[0] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/istoric_joburi/edit/:id', async (req, res) => {
//     try {
//         const data_angajare = req.params.id;
//         const {angajat, nume_angajat, job} = req.body;

//         await pool.query(
//             "UPDATE istoric_joburi SET angajat = ?, nume_angajat = ?, job = ? WHERE data_angajare = ?",
//             [angajat, nume_angajat, job, data_angajare]
//         );

//         res.redirect('/istoric_joburi');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.get('/joburi/edit/:id', async (req, res) => {
    try {
        const id_job = req.params.id;
        const [rows] = await pool.query("SELECT * FROM joburi WHERE id_job = ?", [id_job]);
        res.render('edits/edit_joburi', { job: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/joburi/edit/:id', async (req, res) => {
    try {
        const id_job = req.params.id;
        const { nume, salariu_minim, salariu_maxim } = req.body;

        await pool.query(
            "UPDATE joburi SET nume = ?, salariu_minim = ?, salariu_maxim = ? WHERE id_job = ?",
            [nume, salariu_minim, salariu_maxim, id_job]
        );

        res.redirect('/joburi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/preturi/edit/:magazin/:produs', async (req, res) => {
    try {
        const magazin = req.params.magazin;
        const produs = req.params.produs;
        const [rows] = await pool.query("SELECT * FROM preturi WHERE magazin = ? AND produs = ?", [magazin, produs]);
        res.render('edits/edit_preturi', { pret: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/preturi/edit/:magazin/:produs', async (req, res) => {
    try {
        const magazin = req.params.magazin;
        const produs = req.params.produs;
        const { suma } = req.body;

        await pool.query(
            "UPDATE preturi SET suma = ? WHERE magazin = ? AND produs = ?",
            [suma, magazin, produs]
        );

        res.redirect('/preturi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/produse_categorii/edit/:categorie/:produs', async (req, res) => {
    try {
        const categorie = req.params.categorie;
        const produs = req.params.produs;
        const [rows] = await pool.query("SELECT * FROM produse_categorii WHERE categorie = ? AND produs = ?", [categorie, produs]);
        res.render('edits/edit_produse_categorii', { produs_categorie: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/produse_categorii/edit/:categorie/:produs', async (req, res) => {
    try {
        const categorie = req.params.categorie;
        const produs = req.params.produs;
        const { data } = req.body;

        await pool.query(
            "UPDATE produse_categorii SET data = ? WHERE categorie = ? AND produs = ?",
            [data, categorie, produs]
        );

        res.redirect('/produse_categorii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/produse/edit/:id', async (req, res) => {
    try {
        const id_produs = req.params.id;
        const [rows] = await pool.query("SELECT * FROM produse WHERE id_produs = ?", [id_produs]);
        res.render('edits/edit_produse', { produs: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/produse/edit/:id', async (req, res) => {
    try {
        const id_produs = req.params.id;
        const { nume, stare} = req.body;

        await pool.query(
            "UPDATE produse SET nume = ?, stare = ? WHERE id_produs = ?",
            [nume, stare, id_produs]
        );

        res.redirect('/produse');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tranzactii/edit/:id', async (req, res) => {
    try {
        const id_tranzactie = req.params.id;
        const [rows] = await pool.query("SELECT * FROM tranzactii WHERE id_tranzactie = ?", [id_tranzactie]);
        res.render('edits/edit_tranzactii', { tranzactie: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/tranzactii/edit/:id', async (req, res) => {
    try {
        const id_tranzactie = req.params.id;
        const { client, produs, metoda_plata, data} = req.body;

        await pool.query(
            "UPDATE tranzactii SET client = ?, produs = ?, metoda_plata = ?, data = ? WHERE id_tranzactie = ?",
            [client, produs, metoda_plata, data, id_tranzactie]
        );

        res.redirect('/tranzactii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/// DELETE

app.get('/angajati/delete/:id', async (req, res) => {
    try {
        const id_angajat = req.params.id;
        await pool.query("DELETE FROM angajati WHERE id_angajat = ?", [id_angajat]);
        res.redirect('/angajati');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/angajati/delete/:id', async (req, res) => {
    try {
        const id_angajat = req.params.id;
        await pool.query("DELETE FROM angajati WHERE id_angajat = ?", [id_angajat]);
        res.redirect('/angajati');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clienti/delete/:id', async (req, res) => {
    try {
        const id_client = req.params.id;
        await pool.query("DELETE FROM clienti WHERE id_client = ?", [id_client]);
        res.redirect('/clienti');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/clienti/delete/:id', async (req, res) => {
    try {
        const id_client = req.params.id;
        await pool.query("DELETE FROM clienti WHERE id_client = ?", [id_client]);
        res.redirect('/clienti');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/categorii/delete/:id', async (req, res) => {
    try {
        const nume = req.params.id;
        await pool.query("DELETE FROM categorii WHERE nume = ?", [nume]);
        res.redirect('/categorii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/categorii/delete/:id', async (req, res) => {
    try {
        const nume = req.params.id;
        await pool.query("DELETE FROM categorii WHERE nume = ?", [nume]);
        res.redirect('/categorii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/donatii/delete/:id', async (req, res) => {
    try {
        const id_donatie = req.params.id;
        await pool.query("DELETE FROM donatii WHERE id_donatie = ?", [id_donatie]);
        res.redirect('/donatii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/donatii/delete/:id', async (req, res) => {
    try {
        const id_donatie = req.params.id;
        await pool.query("DELETE FROM donatii WHERE nume = ?", [id_donatie]);
        res.redirect('/donatii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/furnizori/delete/:id', async (req, res) => {
    try {
        const id_furnizor = req.params.id;
        await pool.query("DELETE FROM furnizori WHERE id_furnizor = ?", [id_furnizor]);
        res.redirect('/furnizori');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/furnizori/delete/:id', async (req, res) => {
    try {
        const id_furnizor = req.params.id;
        await pool.query("DELETE FROM furnizori WHERE id_furnizor = ?", [id_furnizor]);
        res.redirect('/furnizori');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/istoric_joburi/delete/:id', async (req, res) => {
    try {
        const data_angajare = req.params.id;
        await pool.query("DELETE FROM istoric_joburi WHERE data_angajare = ?", [data_angajare]);
        res.redirect('/istoric_joburi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/istoric_joburi/delete/:id', async (req, res) => {
    try {
        const data_angajare = req.params.id;
        await pool.query("DELETE FROM istoric_joburi WHERE data_angajare = ?", [data_angajare]);
        res.redirect('/istoric_joburi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/joburi/delete/:id', async (req, res) => {
    try {
        const id_job = req.params.id;
        await pool.query("DELETE FROM joburi WHERE id_job = ?", [id_job]);
        res.redirect('/joburi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/joburi/delete/:id', async (req, res) => {
    try {
        const id_job = req.params.id;
        await pool.query("DELETE FROM joburi WHERE id_job = ?", [id_job]);
        res.redirect('/joburi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/magazine/delete/:id', async (req, res) => {
    try {
        const id_magazin = req.params.id;
        await pool.query("DELETE FROM magazine WHERE id_magazin = ?", [id_magazin]);
        res.redirect('/magazine');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/magazine/delete/:id', async (req, res) => {
    try {
        const id_magazin = req.params.id;
        await pool.query("DELETE FROM magazine WHERE id_magazin = ?", [id_magazin]);
        res.redirect('/magazine');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/preturi/delete/:magazin/:produs', async (req, res) => {
    try {
        const magazin = req.params.magazin;
        const produs = req.params.produs;
        await pool.query("DELETE FROM preturi WHERE magazin = ? AND produs = ?", [magazin, produs]);
        res.redirect('/preturi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/preturi/delete/:magazin/:produs', async (req, res) => {
    try {
        const magazin = req.params.magazin;
        const produs = req.params.produs;
        await pool.query("DELETE FROM preturi WHERE magazin = ? AND produs = ?", [magazin, produs]);
        res.redirect('/preturi');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/produse_categorii/delete/:produs/:categorie', async (req, res) => {
    try {
        const categorie = req.params.categorie;
        const produs = req.params.produs;
        await pool.query("DELETE FROM produse_categorii WHERE produs = ? AND categorie = ?", [produs, categorie]);
        res.redirect('/produse_categorii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/produse_categorii/delete/:produs/:categorie', async (req, res) => {
    try {
        const categorie = req.params.categorie;
        const produs = req.params.produs;
        await pool.query("DELETE FROM produse_categorii WHERE produs = ? AND categorie = ?", [produs, categorie]);
        res.redirect('/produse_categorii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/produse/delete/:id', async (req, res) => {
    try {
        const id_produs = req.params.id;
        await pool.query("DELETE FROM produse WHERE id_produs = ?", [id_produs]);
        res.redirect('/produse');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/produse/delete/:id', async (req, res) => {
    try {
        const id_produs = req.params.id;
        await pool.query("DELETE FROM produse WHERE id_produs = ?", [id_produs]);
        res.redirect('/produse');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tranzactii/delete/:id', async (req, res) => {
    try {
        const id_tranzactie = req.params.id;
        await pool.query("DELETE FROM tranzactii WHERE id_tranzactie = ?", [id_tranzactie]);
        res.redirect('/tranzactii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/tranzactii/delete/:id', async (req, res) => {
    try {
        const id_tranzactie = req.params.id;
        await pool.query("DELETE FROM tranzactii WHERE id_tranzactie = ?", [id_tranzactie]);
        res.redirect('/tranzactii');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/produse_noi', async (req, res) => {
    try {
        const query = `
        SELECT
            d.id_donatie,
            d.data AS data_donatie,
            d.produs, 
            p.nume AS nume_produs,
            p.stare AS stare_produs,
            pr.suma AS pret,
            f.nume AS nume_furnizor
        FROM
            donatii d
        JOIN
            produse p ON d.produs = p.id_produs
        JOIN
            preturi pr ON d.produs = pr.produs
        JOIN
            furnizori f ON d.furnizor = f.id_furnizor
        WHERE
            p.stare = 'Nou'
            AND d.data >= STR_TO_DATE('2023-01-01', '%Y-%m-%d')
            AND pr.suma >= 2000;

    
        `;
        const [rows] = await pool.query(query);
        res.render('produse_noi', { donatii: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/having', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT
             id_magazin,
             nume AS nume_magazin,
             COUNT(produs) AS numar_produse
        FROM
             magazine 
        JOIN
             preturi ON id_magazin = magazin
        GROUP BY
             id_magazin
        HAVING
             COUNT(produs) > 3;
    
        `);
        res.render('having', { magazine: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
