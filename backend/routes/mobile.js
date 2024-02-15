const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('backend/data_base.db');

router.get('/:code_identification', (req, res) => {
    const code = req.params.code_identification;
    db.get('SELECT * FROM maison WHERE code_identification = ?', [code], (err, row) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'état de la maison :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            // res.json(row);
            JSON.stringify (row);
            if (row && row.id){
                db.all('SELECT * FROM pieces_maison WHERE maison_id = ?', [row.id], (err, rows) => {
                    if (err) {
                        console.error('Erreur lors de la récupération des informations sur l\'état de la maison :', err);
                        res.status(500).json({ error: 'Erreur serveur' });
                    } else {
                        if (!rows) {
                            res.status(404).json({ error: 'Missing Value' });
                        }else{
                            const piecesList = rows.map(row => ({ id: row.id, code_identification: row.code_identification, systemState: row.etat, temparature: row.temparature }));
                            piecesList.forEach(piece => {
                                piece.smokeDetected = (piece.systemState<1) ? false : true;
                                piece.fireDetected = (piece.systemState<2) ? false : true;
                            });
                            //JSON.stringify (row);
                            res.json (piecesList);
                        }
                    }
                });
            }else{
                res.status(404).json({ error: 'Missing Value' });
            }
        }
    });
});

router.put('/:code_identification', (req, res) => {
    const code_identification = req.params.code_identification;
    const { latitude, longitude, etat } = req.body;
    db.run('UPDATE maison SET latitude = ?, longitude = ?, etat = ? WHERE code_identification = ?', [latitude, longitude, etat, code_identification], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de la maison :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Maison mis à jour avec succès');
            res.sendStatus(200);
        }
    });
});

router.post('/', (req, res) => {
    const { codeIdentification, latitude, longitude, etat } = req.body;
    console.log(codeIdentification)
    db.run('INSERT INTO maison (code_identification, latitude, longitude, etat) VALUES (?, ?, ?, ?)', [codeIdentification, latitude, longitude, etat], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de la maison :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.sendStatus(200);
        }
    });
});

router.post('/room', (req, res) => {
    const { codeIdentification, etat, maison_id } = req.body;
    db.run('INSERT INTO pieces_maison (code_identification, etat, maison_id) VALUES (?, ?, ?)', [codeIdentification, etat, maison_id], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données de la pièce :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.sendStatus(200);
        }
    });
});

/*router.get('/room/:maison_id', (req, res) => {
    const maison_id = req.params.maison_id;
    db.get('SELECT * FROM pieces_maison WHERE maison_id = ?', [maison_id], (err, row) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'état de la pièce de la maison :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.json(row);
        }
    });
});*/

/*router.put('/room/:code_identification', (req, res) => {
    const code_identification = req.params.code_identification;
    const { etat, temperature } = req.body;
    db.run('UPDATE pieces_maison SET etat = ?, temperature = ? WHERE code_identification = ?', [etat, temperature, code_identification], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de la piece :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('piece mis à jour avec succès');
            res.sendStatus(200);
        }
    });
});*/

module.exports = router;