const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data_base.db');

router.put('/:code_identification', (req, res) => {
    const code_identification = req.params.code_identification;
    const { etat } = req.body;
    db.run('UPDATE maison SET etat = ?,  WHERE codeIdentification = ?', [etat, code_identification], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de la piece :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('piece mis à jour avec succès');
            res.sendStatus(200);
        }
    });
});

module.exports = router;